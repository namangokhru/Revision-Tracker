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
});
