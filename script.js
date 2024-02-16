document.addEventListener('DOMContentLoaded', function() {
    const textSections = [
        { text: "This interactive experience delves into a debate between two icons of graphic design that shaped the design world.", isLink: false },
        { text: "\n", isLink: false }, // Line break
        { text: "\n", isLink: false }, // Line break
        { text: "Wim Crouwel", isLink: true, href: "https://www.stedelijk.nl/en/exhibitions/wim-crouwel" },
        { text: " a staunch modernist, championed the use of grid systems and a methodical approach to design, advocating for clarity, simplicity, and universal communication above all.", isLink: false },
        { text: "\n", isLink: false }, // Line break
        { text: "Jan van Toorn", isLink: true, href: "https://www.stedelijk.nl/en/news/jan-van-toorn-1932-2020-2" },
        { text: " embraced a more eclectic and critical approach, arguing for the importance of engaging the viewer through layered, complex designs that provoke thought and challenge societal norms.", isLink: false },
        { text: "\n", isLink: false }, // Line break
        { text: "\n", isLink: false }, // Line break
        { text: "As you navigate through their exchange, consider the implications of their ideas on today's design landscape, and explore where you might stand in this enduring debate.", isLink: false },
    ];
    typewriterEffectWithLinks('introText', textSections, function() {
        setTimeout(() => {
            document.getElementById('continuePrompt').classList.remove('hidden');
        }, 3000);
    });
});

function typewriterEffectWithLinks(elementId, sections, callback) {
    let currentSectionIndex = 0;
    const element = document.getElementById(elementId);
    element.innerHTML = ''; // Ensure the element is empty

    function typeNextSection() {
        if (currentSectionIndex < sections.length) {
            const section = sections[currentSectionIndex];
            if (section.isLink) {
                const link = `<a href="${section.href}" target="_blank">${section.text}</a>`;
                element.innerHTML += link;
                currentSectionIndex++;
                setTimeout(typeNextSection, 500); // Small delay before typing next section
            } else if (section.text === "\n") {
                element.innerHTML += '<br>'; // Insert a line break for "\n"
                currentSectionIndex++;
                setTimeout(typeNextSection, 500); // Small delay before typing next section
            } else {
                typeWriter(section.text, () => {
                    currentSectionIndex++;
                    typeNextSection();
                });
            }
        } else if (callback) {
            callback();
        }
    }

    function typeWriter(text, onComplete) {
        let i = 0;
        const speed = 50; // Speed in milliseconds

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (onComplete) {
                onComplete(); // When text section is complete, call onComplete
            }
        }

        type();
    }

    typeNextSection(); // Start typing the first section
}
