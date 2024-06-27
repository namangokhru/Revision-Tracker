document.addEventListener('DOMContentLoaded', function() {
    const topicsList = document.getElementById('topics-list');
    const addTopicForm = document.getElementById('add-topic-form');
    const topicInput = document.getElementById('topic');

    // Load topics from local storage on page load
    let topics = JSON.parse(localStorage.getItem('topics')) || [];

    // Function to render topics in the UI
    function renderTopics() {
        topicsList.innerHTML = '';
        topics.forEach((topic, index) => {
            const topicItem = document.createElement('div');
            topicItem.classList.add('topic-item');
            if (topic.done) {
                topicItem.classList.add('completed');
            }
            topicItem.innerHTML = `
                <input type="checkbox" id="topic-${index}" ${topic.done ? 'checked' : ''}>
                <label for="topic-${index}">${topic.name}</label>
                <span class="count">${topic.count || 0}</span>
                <button class="delete-button" data-index="${index}">Delete</button>
            `;

            // Update count and checkbox status when checkbox is toggled
            const checkbox = topicItem.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', function() {
                topic.done = this.checked;
                topic.count = 0; // Reset count
                topic.checkedDate = new Date().toISOString(); // Update checked date
                localStorage.setItem('topics', JSON.stringify(topics));
                renderTopics();
            });

            // Delete topic when delete button is clicked
            const deleteButton = topicItem.querySelector('.delete-button');
            deleteButton.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent form submission on button click
                topics.splice(index, 1); // Remove the topic from the array
                localStorage.setItem('topics', JSON.stringify(topics));
                renderTopics();
            });

            topicsList.appendChild(topicItem);
        });
    }

    // Function to update count for each topic
    function updateCounts() {
        const today = new Date();
        topics.forEach(topic => {
            if (topic.checkedDate) {
                const lastCheckedDate = new Date(topic.checkedDate);
                const diffTime = Math.abs(today - lastCheckedDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                topic.count = diffDays;
            }
        });
        localStorage.setItem('topics', JSON.stringify(topics));
        renderTopics();
    }

    // Add topic form submit event
    addTopicForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const topicName = topicInput.value.trim();
        if (topicName) {
            const newTopic = {
                name: topicName,
                done: false,
                count: 0,
                checkedDate: null
            };
            topics.push(newTopic);
            localStorage.setItem('topics', JSON.stringify(topics));
            topicInput.value = '';
            renderTopics();
        }
    });

    // Initialize and render topics on page load
    renderTopics();

    // Update counts every day
    setInterval(updateCounts, 24 * 60 * 60 * 1000); // Update counts daily
    updateCounts(); // Initial count update on page load
});
