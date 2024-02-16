document.addEventListener('DOMContentLoaded', () => {
    const prompt = document.getElementById('spacecont');
    prompt.style.opacity = 1;

    // Hide the prompt after 3 seconds
    setTimeout(() => {
        prompt.style.opacity = 0;
    }, 3000);
});
    const dialogue = [
        { side: 'crouwel', text: "Jan, you know, diving straight into it—I’ve always been a fan of keeping things straightforward and clean with design. The grid’s my go-to. Why mess with a good thing by adding all those layers you're so fond of? Clear communication trumps everything else, doesn't it?"},
        { side: 'vantoorn', text: "Ah, Wim, I knew you'd say that. But here's the thing—life’s not just about straight lines and order. Design is about mirroring the world’s chaos and beauty, not just about transmitting data. We’ve got the power to make people feel and think, not just see. Isn’t that worth a bit of complexity?" },
        { side: 'crouwel', text: "I see your point, but I worry. If we start injecting too much of ourselves into our work, doesn't that muddy the waters? I mean, there’s beauty in simplicity, in letting the content shine without our fingerprints all over it."},
        { side: 'vantoorn', text: "But Wim, our fingerprints are what make our work meaningful. Pretending to be invisible is just that—pretending. Every choice we make, from the font to the layout, is a reflection of us. Why not own that? Our designs should provoke, question, and even unsettle. They should be a dialogue, not a one-way broadcast." },
        { side: 'crouwel', text: "Jan, my concern is where do you draw the line? At what point does the design stop serving its purpose and start becoming a soapbox for the designer? Yes, we make choices, but shouldn’t those choices be in service of clarity and accessibility?"},
        { side: 'vantoorn', text: "And you don’t think challenging the audience can serve a purpose? We’re not just decorators; we’re communicators. And communication in the real world is messy, it’s heated, it’s passionate. Shouldn’t our designs reflect that? We should be engaging our audience, making them think, not just spoon-feeding them information." },
        { side: 'crouwel', text: "I suppose there’s merit in your argument, but the digital world—with its endless scroll and fleeting attention—surely that’s a place where clarity should be king. How do you balance your desire for engagement with the practical need for web designs to be instantly comprehensible?"},
        { side: 'vantoorn', text: "That’s the challenge, isn’t it? The digital doesn’t dilute our responsibility; it amplifies it. Yes, attention is fleeting, but that means we need to be even more creative in how we capture and hold it. Engaging doesn’t mean confusing; it means making the experience memorable, making the message stick because it resonated, not just because it was clear." },
        { side: 'crouwel', text: "I can’t help but admire your optimism, Jan. It’s true, we approach our craft from different angles, but I guess that’s what makes this field so endlessly fascinating. There’s room for both our perspectives, and perhaps it’s in the tension between them that the most innovative designs are born."},
        { side: 'vantoorn', text: "Exactly! It’s our debates, our disagreements, that push us to reexamine our assumptions and grow. Your dedication to clarity forces me to ensure my designs don’t lose their message in their ambition to engage. And hopefully, my focus on engagement challenges you to find ways to make clarity compelling." },
        { side: 'crouwel', text: "You’ve got a point there. It’s this back-and-forth that keeps the wheels turning. Who knows, maybe there’s a middle ground where our philosophies overlap—a space where clarity and complexity coexist and elevate the design beyond our individual visions."},
        { side: 'vantoorn', text: "Now that’s a space I’d like to explore. With your knack for order and my penchant for questioning, we could push the boundaries of what design can be. After all, it’s in the diversity of thought that creativity thrives. Shall we venture into that space together, see what we can create?" },
        { side: 'crouwel', text: "Let’s do it, Jan. Here’s to challenging each other and the world of design to be better, more thoughtful, and endlessly inventive. May our dialogue continue to inspire not just us but future generations of designers!"},
        { side: 'vantoorn', text: "----- END -----"},]
// Assuming existing variables and functions are defined above

let conversationIndex = 0;
let isDialogueComplete = false; // Flag to indicate the end of the dialogue
document.addEventListener('keyup', (e) => {
    if (e.code === "Space") {
        // If there's more dialogue to display
        if (conversationIndex < dialogue.length) {
            const entry = dialogue[conversationIndex];
            const side = document.getElementById(entry.side);
            const p = document.createElement('p');
            p.textContent = entry.text;
            p.style.marginBottom = "50px"; // Adjust spacing as needed
            side.appendChild(p);
            conversationIndex++;
        } else if (!isDialogueComplete) {
            // If we've reached the end of the dialogue, set the flag
            isDialogueComplete = true;
        } else {
            // If the dialogue is complete and space bar is pressed again, show the poll
            showPoll();
            // Remove the space bar event listener to prevent showing the poll multiple times
            document.removeEventListener('keyup', e => {});
        }
    }
});

// The submitPoll function remains unchanged
function showPoll() {
    const poll = document.getElementById('poll');
    poll.style.display = 'flex'; // Use 'block' if not using Flexbox for the poll itself
    if (poll) poll.classList.remove('hidden'); // Make the poll visible
}

function submitPoll() {
    // Ensure there's a selected option
    const selectedOptionInput = document.querySelector('input[name="tag"]:checked');
    if (!selectedOptionInput) {
        alert("Please select an option.");
        return;
    }
    const selectedOption = selectedOptionInput.value;

    // Send the selected option to the server
    fetch('http://lohttp://localhost:${PORT}', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ choice: selectedOption }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(() => fetchPollResults()) // Fetch and display the updated results
    .catch(error => console.error('Error:', error));
}

function fetchPollResults() {
    fetch('http://localhost:${PORT}')
    .then(response => response.json())
    .then(data => displayPollResultsAsPercentages(data))
    .catch(error => console.error('Error fetching poll results:', error));
}

function displayPollResultsAsPercentages(data) {
    const resultsContainer = document.getElementById('pollResults');
    resultsContainer.innerHTML = '<h3>Poll Results</h3>';

    const totalVotes = Object.values(data).reduce((a, b) => a + b, 0);

    Object.keys(data).forEach(key => {
        const percentage = totalVotes > 0 ? ((data[key] / totalVotes) * 100).toFixed(2) : 0;
        resultsContainer.innerHTML += `<p>${key}: ${percentage}% votes</p>`;
    });

    if (totalVotes === 0) {
        resultsContainer.innerHTML += "<p>No votes have been cast yet.</p>";
    }
}
