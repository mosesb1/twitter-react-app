import {useState, useEffect} from 'react';

export default function UploadImage(props) {
    const [images, setImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        if(images.length < 1) return;
        const newImageUrls = [];
        images.forEach(image => {
            newImageUrls.push(URL.createObjectURL(image))
        })
        setImageUrls(newImageUrls);
    }, [images])

    const handleChange = (evt) => {
        setImages([...evt.target.files])
    }

    return (
        <>
            <input type='file' name="img" multiple accept="image/*" onChange={handleChange} />
            {imageUrls.map((imageSrc, idx) => <img key={idx} src={imageSrc} />)}
        </>
    )
}