const dfMessenger = document.querySelector('df-messenger');
            dfMessenger.addEventListener('df-messenger-loaded', function () {
                // Handle event
                let dfIcon = dfMessenger?.shadowRoot?.querySelector("#widgetIcon");
                if(dfIcon) {
                    dfIcon.style.bottom = "60px";
                }
            });