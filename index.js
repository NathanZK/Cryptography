let copy = document.getElementById("copy")
let paste = document.getElementById("paste")

copy.addEventListener("click", () => {
    let copyText = document.getElementById('result')
    navigator.clipboard.writeText(copyText.innerHTML)
    
    copy.innerHTML = "Encryption Copied!"
    copy.disabled = true
})

paste.addEventListener("click", async () => {
    let pasteText = await navigator.clipboard.readText()
    document.getElementById("text1").value = pasteText
})


function encrypt(key, plaintext, algorithm) {
    let output = "";
    

    switch (algorithm.value) {
        case "OTP":
            output = otp(plaintext, key, "encrypt", true);
            break
        case "AES":
            output = CryptoJS.AES.encrypt(plaintext, key)
            break
        case "3DES":
            output = CryptoJS.TripleDES.encrypt(plaintext, key)
            break

        default:
            console.log("Algorithm not selected")
            output = "Algorithm not selected"
    }
    

    document.getElementById("result").innerHTML = output
}

function decrypt(key, cyphertext, algorithm) {
    let output = "";

    switch (algorithm.value) {
        case "OTP":
            output = otp(cyphertext, key, "decrypt", true);
            break
        case "AES":
            output = CryptoJS.AES.decrypt(cyphertext, key).toString(CryptoJS.enc.Utf8)
            break
        case "3DES":
            output = CryptoJS.TripleDES.decrypt(cyphertext, key).toString(CryptoJS.enc.Utf8)
            break

        default:
            console.log("Algorithm not selected")
            output = "Algorithm not selected"
    }
    
    if (output === "")
        output = "Wrong key"

    document.getElementById("result1").innerHTML = output
}


let submitButton = document.getElementById("submit")
let crypt = document.getElementById("crypt")
let cryptForm = document.getElementById('cryptForm')

cryptForm.addEventListener('submit', (event)=>{
    event.preventDefault()

    let key = document.getElementById("key").value
    let text = document.getElementById("text").value
    let algorithm = document.getElementById("algorithm")
    encrypt(key, text, algorithm)
    
    copy.innerHTML = 'Copy Encryption'
    copy.disabled = false
})

let submitButton1 = document.getElementById("submit1")
let decryptForm = document.getElementById('decryptForm')

decryptForm.addEventListener('submit', (event)=>{
    event.preventDefault()

    let key = document.getElementById("key").value
    let text1 = document.getElementById("text1").value
    let algorithm = document.getElementById("algorithm")
    decrypt(key, text1, algorithm)
    
    copy.innerHTML = 'Copy Encryption'
    copy.disabled = false
})
