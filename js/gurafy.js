window.onload = function () {

    var form = document.getElementById("main-form");

    function handleForm(event) {
        event.preventDefault();
        document.getElementById("button-create").click()
    }
    form.addEventListener('submit', handleForm);

    var lastDownload;

    document.getElementById('button-download').onclick = function () {
        if (!lastDownload) {
            return;
        }

        var downloadLink = document.createElement('a');

        downloadLink.download = lastDownload + '_gurafied.png';
        downloadLink.href = document.getElementById('gurafy_canvas').toDataURL();
        downloadLink.click();
    }

    document.getElementById('button-create').onclick = function () {
        var tgProfilePicAPI = "https://unavatar.now.sh/telegram/";

        var userInput = document.getElementById('telegram-handle-input').value;
        var screenName = userInput.substr(userInput.lastIndexOf("/") + 1);

        screenName = screenName.trim().replace(/^@/, '');

        if (screenName === "") {
            return;
        }

        var apiUrl = tgProfilePicAPI + screenName;

        var mainImage = document.getElementById('gurafy_image');
        var mainCanvas = document.getElementById('gurafy_canvas');
        var ctx = mainCanvas.getContext('2d');

        var profileImage = new Image;
        var overlayImage = new Image;

        profileImage.crossOrigin = 'Anonymous';
        overlayImage.crossOrigin = 'Anonymous';

        profileImage.onload = function () {
            mainCanvas.setAttribute('width', '400');
            mainCanvas.setAttribute('height', '400');

            ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
            ctx.drawImage(profileImage, 0, 0, profileImage.width, profileImage.height, 0, 0, mainCanvas.width, mainCanvas.height);
            ctx.drawImage(overlayImage, 0, 0, overlayImage.width, overlayImage.height, 0, 0, mainCanvas.width, mainCanvas.height);
			
            var dataURL = mainCanvas.toDataURL();
            mainImage.setAttribute('src', dataURL);

            lastDownload = screenName;

            shake(mainImage, 30);
        };

        profileImage.src = "";
        overlayImage.src = "";

        profileImage.src = apiUrl;
        overlayImage.src = gura_hood;
    }

    var animateButton = function (e) {
        e.preventDefault;
        e.target.classList.remove('animate');
        e.target.classList.add('animate');

        setTimeout(function () {
            e.target.classList.remove('animate');
        }, 700);
    };

    var bubblyButtons = document.getElementsByClassName("bubbly-button");

    for (var i = 0; i < bubblyButtons.length; i++) {
        bubblyButtons[i].addEventListener('click', animateButton, false);
    }
}
