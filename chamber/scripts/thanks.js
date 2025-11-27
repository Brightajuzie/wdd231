 document.addEventListener('DOMContentLoaded', function() {
            // Get URL parameters (The data submitted via GET method)
            const urlParams = new URLSearchParams(window.location.search);
            const dataContainer = document.getElementById('confirmation-data');

            // Map of required field names to human-readable labels
            const requiredFields = {
                'first_name': "First Name",
                'last_name': "Last Name",
                'email': "Email Address",
                'mobile': "Mobile Number",
                'org_name': "Business Name",
                'timestamp': "Date/Time Submitted"
            };

            for (const [name, label] of Object.entries(requiredFields)) {
                const value = urlParams.get(name);
                
                if (value) {
                    const dataItem = document.createElement('div');
                    dataItem.className = 'data-item';

                    // Format the timestamp for better readability
                    let displayValue = value;
                    if (name === 'timestamp') {
                        try {
                            const date = new Date(value);
                            displayValue = date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
                        } catch (e) {
                            // If parsing fails, just use the raw value
                        }
                    }

                    dataItem.innerHTML = `<strong>${label}:</strong> ${displayValue}`;
                    dataContainer.appendChild(dataItem);
                }
            }

            // If no data is found (e.g., accessed directly), display a message
            if (dataContainer.children.length === 0) {
                dataContainer.innerHTML = '<p>No form submission data was found.</p>';
            }
        });