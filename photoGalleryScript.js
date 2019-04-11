
/**** GLOBAL VARIABLES ****/
const gallery = document.querySelector(".gallery");
const pics = document.querySelector(".pics");
const slideshowImages = ["./images/01.JPG", "./images/02.JPG", "./images/03.JPG", "./images/04.JPG", "./images/05.JPG", "./images/06.JPG", "./images/07.JPG"];
const nextBtn = document.querySelector(".next-btn");
const infoBtn = document.querySelector(".info-btn");
const studentPicture = document.querySelector(".studentPicture");
let content = document.querySelector("p");



/**** this works for the background slideshow pictures  ****/
let i = 0;
gallery.innerHTML = `<div class="groupPic"><img name='picture' /></div>`;
function displaySlidePictures() {
    document.picture.src = slideshowImages[i];
    if (i < slideshowImages.length - 1) {
        i++;
    } else {
        i = 0;
    }
    setTimeout('displaySlidePictures()', 3000);
}
window.addEventListener('load', () => {
    displaySlidePictures();
});

/////
let studentsGallery = null;

let modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

class Student {
    constructor(studentInfo) {
        this.firstName = studentInfo.firstName;
        this.lastName = studentInfo.lastName;
        this.title = studentInfo.title;
        this.nationality = studentInfo.nationality;
        this.src = studentInfo.src;
        this.alt = studentInfo.alt;
        this.skills = studentInfo.skills;
        this.whySoftDev = studentInfo.whySofterDeveloper;
        this.vision = studentInfo.longTermVision;
        this.motivation = studentInfo.motivatesMe;
        this.quote = studentInfo.favoriteQuote;
        this.joined = studentInfo.joinedOn;
    }
}

class Gallery {
    students = [];

    constructor(students) {

        students.forEach(student => {
            this.students.push(new Student(student));
        });
        this.currentIndex = 0;
        this.currentStudent = this.students[0];
    }

    get getCurrentIndex() {
        return this.currentIndex;
    }

    set setCurrentIndex(index) {
        this.currentIndex = index;
    }

    showStudent(index, div, append) {
        if (!append) {
            div.innerHTML = "";
        }
        let imageWrapper = document.createElement("div");
        imageWrapper.className = 'imageSection';
        let image = document.createElement("img");
        image.src = `./images/${this.students[index].src}`;
        imageWrapper.appendChild(image);
        div.appendChild(imageWrapper);
    }

    showInfo(index) {
        modal.style.display = "block";
        // content.textContent = this.currentStudent.firstName;
        console.log(this.currentStudent);

        content.innerHTML = `<table class="infoTable">
        <tr id="name">
        <th colspan='2'><h4>${this.currentStudent.firstName} ${this.currentStudent.lastName}</h4></th>
        </tr>
        <tr>
        <td>Title: </td>
        <td>${this.currentStudent.title}</td>
        </tr>
        <tr>
        <td>Nationality: </td>
        <td>${this.currentStudent.nationality}</td>
        </tr>
        <tr>
        <td>Skills: </td>
        <td>${this.currentStudent.skills}</td>
        </tr>
        <tr>
        <td>Why Software Developer : </td>
        <td>${this.currentStudent.whySoftDev}</td>
        </tr>
        <tr>
        <td>Long Term Vision : </td>
        <td>${this.currentStudent.vision}</td>
        </tr>
        <tr>
        <td>Motivates Me : </td>
        <td>${this.currentStudent.motivation}</td>
        </tr>
        <tr>
        <td>Favorite Quote: </td>
        <td>${this.currentStudent.quote}</td>
        </tr>
        <tr>
        <td>Joined By : </td>
        <td>${this.currentStudent.joined}</td>
        </tr>
        </table>`;
    }
}
loadStudents();

function loadStudents() {
    fetch("./data.json")
        .then(function (response) {
            if (response.status !== 200) {
                console.log(
                    "Looks like there was a problem. Status Code: " + response.status
                );
                return;
            }

            // Examine the text in the response
            response.json().then(function (data) {
                //console.log(data);

                studentGallery = new Gallery([...data]);

                studentGallery.showStudent(studentGallery.currentIndex, studentPicture, false);
                //gallery.showStudents();
                //console.log(students);
            });
        })
        .catch(function (err) {
            console.log("Fetch Error :-S", err);
        });
}

nextBtn.addEventListener("click", e => {
    if (studentGallery.currentIndex === studentGallery.students.length - 1) {
        studentGallery.currentIndex = 0;
    } else {
        studentGallery.currentIndex += 1;
    }

    studentGallery.currentStudent = studentGallery.students[studentGallery.currentIndex];
    studentGallery.showStudent(studentGallery.currentIndex, studentPicture);
});

infoBtn.addEventListener("click", e => {
    studentGallery.showInfo(studentGallery.currentIndex);
});




// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

