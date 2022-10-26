import { React } from 'react';
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import {Redirect, useHistory} from 'react-router-dom';

import FileUpload from '../../services/fileupload';  
import Header from "../../components/Headers/Header.js";
import { Button, FormGroup, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { 
    Card, 
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col,
} from "reactstrap";

function UploadFile() {
    const [files, setFiles] = useState([]);
    const [upload, setUpload] = useState('');//true) 
    const [data, setData] = useState({});

    let history = useHistory();
    let formData = new FormData();
    
    const uploadHandler = async (event) => {
        const file = event.target.files[0];
        console.log(file)
        setFiles([...files, file])
        // form data -------------------------------------

        formData.append('Document', event.target.files[0])
        formData.append('userid',1 )
        FileUpload.upload(formData).then(res => {
            var dd = res.data
            console.log(typeof dd);
            setData(res.data.html);
            history.push({pathname:'/admin/visualize', 
            state:{data:res.data.html, name:res.data.name, features:res.data.features, samples:res.data.samples}});
        })
    }
    const deleteFile = (filename) => {
        setFiles(files.filter(file => file.name !== filename))
    }
    return (
        <>
            <Header />
                <Container className="mt--7" fluid>
                    <Row className="mt-5">
                        <Col>
                            {/* xl="4"> */}
                            <Card className="shadow">
                            <CardHeader className="border-0">
                            <Row className="align-items-center">
                            <div className="col">
            <h3 className="mb-0">Upload File</h3>
                </div>
            </Row>
            </CardHeader>
        <Card className="shadow align-items-center">
            <StyledButton style={{  marginBottom : 25,   marginTop : 25}}>
                {/* <div className='title'>Upload File</div> */}
                <div className='App' >
                    <>
                        <div className="file-card">
                            <div className="file-inputs">
                                <input type="file" accept='.csv,.xls'
                                    onChange={uploadHandler} />
                                <button type='submit'>
                                    <i>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </i>
                                    Upload Sample File
                                </button>
                            </div>
                            <p className="main">Supported files</p>
                            <p className="info">CSV, XLS</p>
                            <>
                                <ul className="file-list">
                                    {
                                        files &&
                                        files.map(files => (
                                            <li className="file-item" key={files.name}>
                                                <FontAwesomeIcon icon={faFileAlt} />
                                                <p>{files.name}</p>
                                                <div className="actions">
                                                    <div className="loading"></div>
                                                    {files.isUploading ? <FontAwesomeIcon
                                                        icon={faSpinner} className="fa-spin"
                                                        onClick={() => deleteFile(files.name)} />
                                                        :
                                                        <FontAwesomeIcon icon={faTrash}
                                                            onClick={() => deleteFile(files.name)} />
                                                    }
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </>
                        </div>
                    </>
                </div>
            </StyledButton >
</Card>
        </Card>
        </Col>
</Row>
    </Container>
        </>
    )
}



export default UploadFile;

const StyledButton= styled.div`
.title {
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 3em;
    margin-left: 12em;
}
.file-card {
    margin-left: 1.5em;
    margin-right: 1.5em;
    padding: 1em;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    border: 3px dashed #cbd5e0;
    background-color: #edf2f7;
    width: 380px;
    height: 210px;

    .file-inputs {
        position: relative;
        margin-bottom: 1em;

        input {
            position: relative;
            text-align: right;
            opacity: 0;
            z-index: 2;
            cursor: pointer;
            height: 46px;
            max-width: 300px;
        }

        button {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            z-index: 1;
            display: flex;
            justify-content: center;
            align-items: center;

            color: #fff;
            background-color: #3ba051;
            font-size: 1.1rem;
            cursor: pointer;
            border-radius: 4px;
            border: none;
            outline: none;
            // padding: 1em;
            transition: background-color 0.4s;
            box-shadow: 0px 8px 24px rgba(16, 139, 119, 0.5);

            i {
                width: 1.5em;
                height: 1.5em;
                padding: 0.4em;
                background-color: #fff;
                color: #3ba051;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 0.8em;
                font-size: 0.8em;
            }
        }

        &:hover {
            button {
                background-color: #f15120;
            }
        }
    }
}

.main {
    font-weight: bold;
    margin-bottom: 0.4em;
}

.info {
    font-size: 0.8rem;
}
//  ----------------------
li {
    list-style: none;
    margin: 1.2em 0;
    background-color: #6ae69338;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 1.2em 1.5em;
    height:1px;
    width: 300px;
    svg {
        color: #21f579;
        &:first-child {
            font-size: 1.2em;
            margin-right: 0.8em;
        }
    }

    p {
        flex: 1;
        font-size: 0.9rem;
    }

    .actions {
        justify-self: flex-end;
        cursor: pointer;
        .fa-spinner {
            font-size: 1.2em;
        }
    },
}
`;