import React, { useState } from 'react';
import validator from 'validator';
import ipfs from '../ipfs';




import { convertToBuffer } from '../helpers/convertToBuffer';
import { useForm } from '../hooks/useForm';
import { ImCross } from 'react-icons/im';
import './screens/style.css';


const materialTypes = [
    "Activity/Lab",
    "Assessment",
    "Case Study",
    "Data Set",
    "Diagram/Illustration",
    "Full Course",
    "Game",
    "Homework/Assignment",
    "Interactive",
    "Lecture",
    "Lecture Notes",
    "Lesson",
    "Lesson Plan",
    "Module",
    "Primary Source",
    "Reading"
];

const licenses = [
    "CC0", "BY", "BYSA", "BYNC"
]

const languages = [
    "English", "Spanish", 'Portuguese'
];

export const UploadForm = (props) => {

    const { drizzle, drizzleState } = props;

    const [canSubmit, setCanSubmit] = useState(false);

    const [formState, handleInputChange, reset, setManual] = useForm({
        name: 'My OER',
        subject: 'Any',
        license: 'CC0',
        language: 'Spanish',
        materialType: 'Assesment',
        file: '',
        tags: [],
    });

    const [tag, setTagInputvalue] = useState("")

    const { name, subject, tags, license, language, materialType, file } = formState;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            console.log(drizzle.web3.utils);
            const ipfsFileName = drizzle.web3.utils.utf8ToHex(name);
            const ipfsSubject = drizzle.web3.utils.utf8ToHex(subject);
            const ipfsMaterialType = drizzle.web3.utils.utf8ToHex(materialType);
            const ipfsLanguage = drizzle.web3.utils.utf8ToHex(language);
            const ipfsLicense = drizzle.web3.utils.numberToHex('1');



            await ipfs.add(file, async (err, data) => {
                const { hash } = data[0];
                const ipfsHash = drizzle.web3.utils.utf8ToHex(hash);
                let ipfsTags = ["0x00", "0x00", "0x00", "0x00", "0x00"]
                for (var i = 0; i < tags.length; i++)
                    ipfsTags[i] = drizzle.web3.utils.utf8ToHex(tags[i]);

                drizzle.contracts.ResourceList.methods.addFile(
                    ipfsFileName,
                    ipfsSubject,
                    ipfsTags,
                    ipfsMaterialType,
                    ipfsLicense,
                    ipfsLanguage,
                    ipfsHash
                ).send({
                    from: drizzleState.accounts[0]
                })
                    .on("transactionHash", hash => console.log(hash))
                    .on("receipt", receipt => alert("Transaction completed!"))
                    .on("error", err => console.log(err));
            });
            reset();
        }
    }

    const removeBadge = (i) => {
        setManual({ tags: tags.filter((_, id) => id !== i) });
    }

    const changeTag = ({ target }) => {
        setTagInputvalue(target.value);
    }

    const handleAddTag = (e) => {
        e.preventDefault();
        if (tag.trim().length > 2 && tags.length < 5) {
            setManual({ tags: [...tags, tag] });
            setTagInputvalue("");
        }
    }

    const captureFile = (event) => {
        event.stopPropagation();
        event.preventDefault();

        const file = event.target.files[0];

        if (!!file) {
            const reader = new window.FileReader();
            reader.readAsArrayBuffer(file);
            reader.onloadend = async () => {
                let file = await convertToBuffer(reader);
                setManual({ file });
            };
            setCanSubmit(true);
        }
    }
    const isFormValid = () => {
        if (validator.isEmpty(name)) {
            return false;
        } else if (validator.isEmpty(subject)) {
            return false;
        } else if (materialType === "Choose...") {
            return false;
        } else if (license === "Choose...") {
            return false;
        } else if (language === "Choose...") {
            return false;
        } else if (tags.length === 0) {
            return false;
        }
        return true;
    }

    return (
        <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
                <label className="form-label">Resource Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    maxLength="32"
                    value={name}
                    onChange={handleInputChange}
                    autoComplete="off"
                />
            </div>
            <div className="col-md-6">
                <label className="form-label">Subject</label>
                <input
                    type="text"
                    className="form-control"
                    name="subject"
                    maxLength="32"
                    value={subject}
                    onChange={handleInputChange}
                    autoComplete="off"
                />
            </div>
            <div className="col-md-4">
                <label className="form-label" >
                    Material Type
                </label>
                <select className="form-select" onChange={handleInputChange} name="materialType" value={materialType}>
                    <option>Choose...</option>
                    {materialTypes.map((type, index) => (
                        <option key={index + 1}> {type} </option>)
                    )}
                </select>
            </div>
            <div className="col-md-4">
                <label className="form-label">
                    License
                    <a href="/about"> (?) </a>
                </label>
                <select className="form-select" onChange={handleInputChange} name="license" value={license}>
                    <option>Choose...</option>
                    {licenses.map((type, index) => (
                        <option key={index + 1}> {type} </option>)
                    )}
                </select>
            </div>
            <div className="col-md-4">
                <label className="form-label">
                    Language
                    <a href="/about"> (?) </a>
                </label>
                <select className="form-select" onChange={handleInputChange} name="language" value={language}>
                    <option>Choose...</option>
                    {languages.map((type, index) => (
                        <option key={index + 1}> {type} </option>)
                    )}
                </select>
            </div>
            <div className="col-12">
                <div className="row">
                    <div className="col-12">
                        <label className="form-label">
                            Tags
                        </label>
                    </div>
                    <div className="col-6">
                        <input
                            type="text"
                            name="tag"
                            maxLength="32"
                            onChange={changeTag}
                            value={tag}
                            className="form-control mb-2"
                            placeholder="Insert your tag"
                        />
                    </div>

                    <div className="col-6">
                        <button className="btn btn-primary btn-block" onClick={handleAddTag}>Add</button>
                    </div>
                    <div className="col-12">
                        {tags.map((tag, i) => (<span className="badge bg-primary" key={i}>{tag} <ImCross className="bi bi-x" onClick={() => removeBadge(i)} /></span>))}
                    </div>
                </div>
                <div className="col-12 mt-5">
                    <input
                        type="file"
                        onChange={captureFile} />
                </div>

            </div>

            <div className="col-12">
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!canSubmit}
                >
                    Upload
                </button>
            </div>
        </form>
    )
}
