let recognition;
let isRecording = false;

// Initialize speech recognition
function initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => {
            document.getElementById('status').textContent = 'Listening...';
            document.getElementById('startButton').textContent = 'Stop Recording';
            isRecording = true;
        };

        recognition.onend = () => {
            document.getElementById('status').textContent = 'Click "Start Recording" to begin';
            document.getElementById('startButton').textContent = 'Start Recording';

        };

        recognition.onresult = (event) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                    // Simulate pitch extraction
                    estimateGender({ pitch: Math.random() * 3 });
                }
            }
            if (finalTranscript) {
                document.getElementById('transcription').textContent = finalTranscript;
            }
        };

        recognition.onerror = (event) => {
            document.getElementById('status').textContent = 'Error occurred: ' + event.error;
            document.getElementById('startButton').textContent = 'Start Recording';

        };
    } else {
        alert('Speech recognition is not supported in this browser.');
    }
}

function estimateGender(result) {
    const pitch = result.pitch || 0;
    const frequency = pitch * 100; // Normalize the pitch value

    console.log('Frequency:', frequency); // Debugging frequency output

    let estimatedGender = 'Unknown';
    if (frequency > 0) {
        estimatedGender = frequency > 165 ? 'male' : 'Female';
    }
    
    console.log('Estimated Gender:', estimatedGender); // Check the detected gender
    document.getElementById('gender').textContent = estimatedGender;
}

// Toggle recording
function toggleRecording() {
    if (!recognition) {
        initializeSpeechRecognition();
    }

    if (isRecording) {
        recognition.stop();
    } else {
        recognition.start();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', toggleRecording);
});
