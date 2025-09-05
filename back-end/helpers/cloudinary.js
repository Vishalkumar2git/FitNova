import { v2 as cloudinary} from 'cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name: 'dpckznyh0',
    api_key: '644862453765397',
    api_secret: 'Cv050M9ovoUCTwCa6Mq0Et_q2o0',
})

const storage = new multer.memoryStorage();
async function imageUploadServer(file){
    const result = await cloudinary.uploader.upload(file,{
        resource_type: 'auto'
    })
    return result;
}

const upload = multer({storage});

export  {upload, imageUploadServer};
