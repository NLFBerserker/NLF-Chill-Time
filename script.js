// This ensures the code runs only after the HTML page has fully loaded.
window.onload = function() {

    // Character relaxation levels
    let relaxationLevels = {
        Shadow: 50,
        Berserker: 50,
        Angel: 50,
        Tarim: 50,
        Chaffinch: 50,
    };

    // Group relaxation level
    let groupRelaxation = 50;

    // Rage meter level
    let rageLevel = 0;

    // Simple dialogue options for each character
    const dialogues = {
        Shadow: [
            "Shadow says: 'The night is calm, but I prefer the shadows.'",
            "Shadow smirks: 'Don't let the quiet fool you, I’m always ready.'",
            "Shadow relaxes for a moment: 'Maybe the darkness isn’t so bad tonight.'",
        ],
        Berserker: [
            "Berserker laughs: 'Nothing like a good drink to calm the beast within!'",
            "Berserker grumbles: 'I could still break a few tables, though.'",
            "Berserker shrugs: 'Not bad, but I’m not used to relaxing.'",
        ],
        Angel: [
            "Angel smiles: 'This place feels so peaceful. Maybe too peaceful.'",
            "Angel wonders: 'Do you think we deserve this kind of rest?'",
            "Angel closes her eyes for a second: 'I almost feel at ease here.'",
        ],
        Tarim: [
            "Beloved Tarim chuckles: 'I could sit here forever with you all.'",
            "Tarim stretches: 'You know, sometimes, silence is the best gift.'",
            "Tarim glances around: 'It feels good to be with friends, doesn't it?'",
        ],
        Chaffinch: [
            "Chaffinch hums a tune: 'Nothing like a little music to lighten the mood.'",
            "Chaffinch laughs: 'You all look like you need another round!'",
            "Chaffinch smiles: 'I think we should relax more often.'",
        ],
    };

    // Function to handle talking to characters
    function talkTo(character) {
        // Show a random dialogue from the character
        const dialogue = dialogues[character][Math.floor(Math.random() * dialogues[character].length)];
        document.getElementById('dialogue').textContent = dialogue;

        // Update the character's relaxation level
        updateRelaxation(character);

        // Increase rage if talking to Berserker or Chaffinch
        if (character === "Berserker" || character === "Chaffinch") {
            increaseRage();
        }

        // Apply special abilities if necessary
        applySpecialAbility(character);
    }

    // Update relaxation logic
    function updateRelaxation(character) {
        const change = Math.floor(Math.random() * 11) - 5; // Random change between -5 and +5
        relaxationLevels[character] += change;
        relaxationLevels[character] = Math.min(Math.max(relaxationLevels[character], 0), 100); // Keep between 0 and 100
        document.getElementById(character.toLowerCase() + '-bar').textContent = `Relaxation ${relaxationLevels[character]}%`;
        updateRelaxationBar(character);

        // Update group relaxation based on average relaxation
        updateGroupRelaxation();
    }

    // Apply special abilities based on relaxation levels
    function applySpecialAbility(character) {
        if (character === "Shadow" && relaxationLevels[character] >= 70) {
            document.getElementById('dialogue').textContent += " Shadow uses his calm demeanor to relax everyone.";
            adjustGroupRelaxation(5); // Shadow increases group relaxation
        }

        if (character === "Berserker" && relaxationLevels[character] <= 20) {
            document.getElementById('dialogue').textContent += " Berserker is about to lose control! Everyone's relaxation drops!";
            adjustGroupRelaxation(-10); // Berserker lowers group relaxation
        }
    }

    // Rage meter logic
    function increaseRage() {
        rageLevel = Math.min(rageLevel + 10, 100); // Increase rage by 10, cap at 100
        document.getElementById('rage-meter').textContent = `${rageLevel}%`;
        updateRageBar();
    }

    // Update group relaxation based on the average relaxation
    function updateGroupRelaxation() {
        const totalRelaxation = Object.values(relaxationLevels).reduce((sum, level) => sum + level, 0);
        groupRelaxation = Math.round(totalRelaxation / 5);
        document.getElementById('group-relaxation').textContent = `${groupRelaxation}%`;
        updateRelaxationBar('group');
    }

    // Adjust group relaxation
    function adjustGroupRelaxation(amount) {
        groupRelaxation = Math.min(Math.max(groupRelaxation + amount, 0), 100); // Keep between 0 and 100
        document.getElementById('group-relaxation').textContent = `${groupRelaxation}%`;
    }

    // Update the relaxation bar visually
    function updateRelaxationBar(character) {
        const barElement = document.getElementById(character.toLowerCase() + '-relax-bar');
        const barFill = (relaxationLevels[character] / 100) * 100 + '%'; // Calculate percentage
        barElement.style.setProperty('--bar-fill', barFill); // Update the bar width
    }

    // Update the rage bar visually
    function updateRageBar() {
        const rageBarElement = document.getElementById('rage-relax-bar');
        const barFill = (rageLevel / 100) * 100 + '%'; // Calculate rage percentage
        rageBarElement.style.setProperty('--bar-fill', barFill); // Update rage bar width
    }

    // Expose the `talkTo` function globally so the buttons can access it
    window.talkTo = talkTo;
};