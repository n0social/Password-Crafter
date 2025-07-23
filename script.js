function generatePassword() {
    const length = parseInt(document.getElementById('length').value, 10);
    // Always use all character types for maximum complexity
    const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // removed I and O
    const lower = 'abcdefghijkmnopqrstuvwxyz'; // removed l
    const numbers = '23456789'; // removed 0 and 1
    // Exclude <, >, ", ', `, spaces, [, ], (, ), _, and - for compatibility
    const symbols = '!@#$%&?';

    const charTypes = [
        { chars: upper },
        { chars: lower },
        { chars: numbers },
        { chars: symbols }
    ];

    let allChars = charTypes.map(type => type.chars).join('');
    let passwordArray = [];

    // Ensure at least one character from each type
    charTypes.forEach(type => {
        passwordArray.push(type.chars.charAt(Math.floor(Math.random() * type.chars.length)));
    });

    for (let i = passwordArray.length; i < length; i++) {
        passwordArray.push(allChars.charAt(Math.floor(Math.random() * allChars.length)));
    }

    // Shuffle the password to avoid predictable placement
    for (let i = passwordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }

    document.getElementById('result').value = passwordArray.join('');
}

document.getElementById('generate').addEventListener('click', function() {
    generatePassword();
    // Mario coin animation
    const coinMsg = document.getElementById('coin-message');
    coinMsg.classList.remove('active');
    void coinMsg.offsetWidth; // force reflow
    coinMsg.classList.add('active');
    setTimeout(() => {
        coinMsg.classList.remove('active');
    }, 900);
});
document.getElementById('copy').addEventListener('click', function() {
    const result = document.getElementById('result');
    result.select();
    document.execCommand('copy');
});
