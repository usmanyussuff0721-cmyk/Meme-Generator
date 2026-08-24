import { useState, useEffect } from "react"
import html2canvas from "html2canvas"

export default function Main() {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        imageUrl: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
        
    }, [])

    function getMemeImage() {
        if (allMemes.length === 0) return;
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const newMemeUrl = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            imageUrl: newMemeUrl
        }))
    }

    function handleChange(event) {
        const {name, value} = event.currentTarget;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    function saveMeme() {
    const memeElement = document.querySelector(".meme")
    html2canvas(memeElement, { useCORS: true }).then(canvas => {
        const link = document.createElement("a")
        link.download = "meme.png"
        link.href = canvas.toDataURL("image/png")
        link.click()
    })
}


    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        value={meme.topText}
                        onChange={handleChange}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}
                    />
                </label>
                <button onClick={getMemeImage}>Get a new meme image 🖼</button>
                
            </div>
            <div className="meme">
                <img src={meme.imageUrl} alt="meme image" crossOrigin="anonymous" />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
            <button onClick={saveMeme} className="save-btn">Save Meme 💾</button>
        </main>
    )
}