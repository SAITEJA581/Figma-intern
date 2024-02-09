document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('menuBtn');
    const container = document.querySelector('.container');
  
    menuBtn.addEventListener('click', function () {
      container.classList.toggle('show-sidebar');
      updateIcon();
    });
  
    function updateIcon() {
      const bars = menuBtn.querySelectorAll('.bar');
      bars.forEach(bar => bar.classList.toggle('cancel-icon'));
    }
  });
  
  
  document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.getElementById('dropdownToggle');
    const dropdownIcon = document.getElementById('dropdownIcon');
    const dropdownMenu = document.getElementById('dropdownMenu');
  
    dropdownMenu.style.display = 'block';
    dropdownIcon.style.transform = 'rotate(180deg)';
  
    dropdownToggle.addEventListener('click', function() {
      if (dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '') {
        dropdownMenu.style.display = 'block';
        dropdownIcon.style.transform = 'rotate(180deg)';
      } else {
        dropdownMenu.style.display = 'none';
        dropdownIcon.style.transform = 'rotate(0deg)';
      }
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const campaignSection = document.getElementById('campaignSection');
    const campaignArrow = document.getElementById('campaignArrow');
    const campaignContent = document.getElementById('campaignContent');
  
    campaignContent.style.display = 'block';
    campaignArrow.style.transform = 'rotate(180deg)';
  
    campaignSection.addEventListener('click', function() {
      if (campaignContent.style.display === 'none' || campaignContent.style.display === '') {
        campaignContent.style.display = 'block';
        campaignArrow.style.transform = 'rotate(180deg)';
      } else {
        campaignContent.style.display = 'none';
        campaignArrow.style.transform = 'rotate(0deg)';
      }
    });
  });
  
  
  const importContactButton = document.getElementById("importContactButton");
  const contactFormContainer = document.getElementById("contactFormContainer");
  const contactTable = document.getElementById("contactTablew");
  const saveButton = document.getElementById("saveButton");
  const contactForm = document.getElementById("contactForm");
  
  
  window.addEventListener("load", function () {
      loadTableData();
      updatePaginationButtons(1);
  });
  
  
  function loadTableData() {
      const savedData = JSON.parse(localStorage.getItem("contactData")) || [];
  
      savedData.forEach(data => {
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
              <td><input type="checkbox"></td>
              <td><a href="#">${data.email}</a></td>
              <td>${data.firstName}</td>
              <td>${data.lastName}</td>
              <td>${data.phoneNumber}</td>
              <td class="email-bg"><span class="email-part">${data.emailCategory}</span></td>
              <td>${data.registerDate}</td>
          `;
          contactTable.appendChild(newRow);
      });
  }
  
  importContactButton.addEventListener("click", function (event) {
      event.preventDefault();
  
      const mainDashboard = document.querySelector(".main-dashboard");
      const footerContainer = document.querySelector(".footer-container");
      mainDashboard.style.display = "none";
      footerContainer.style.display = "none";
  
      contactFormContainer.style.display = "block";
  });
  
  saveButton.addEventListener("click", function (event) {
      event.preventDefault();
  
      if (contactForm.checkValidity()) {
          const formData = new FormData(contactForm);
          const formDataObject = {};
          formData.forEach((value, key) => {
              formDataObject[key] = value;
          });
  
          console.log("Form data submitted:", formDataObject);
  
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
              <td><input type="checkbox"></td>
              <td><a href="#">${formDataObject.email}</a></td>
              <td>${formDataObject.firstName}</td>
              <td>${formDataObject.lastName}</td>
              <td>${formDataObject.phoneNumber}</td>
              <td class="email-bg"><span class="email-part">${formDataObject.emailCategory}</span></td>
              <td>${formDataObject.registerDate}</td>
          `;
          contactTable.appendChild(newRow);
  
          saveDataToLocalStorage(formDataObject);
  
          const mainDashboard = document.querySelector(".main-dashboard");
          const footerContainer = document.querySelector(".footer-container");
          mainDashboard.style.display = "block";
          footerContainer.style.display = "block";
  
          contactFormContainer.style.display = "none";
  
          const totalPages = Math.ceil(contactTable.rows.length / 10);
          updatePaginationButtons(1, totalPages);
      } else {
          contactForm.reportValidity();
      }
  });
  
  contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      saveButton.click();
  });
  
  function saveDataToLocalStorage(data) {
      const savedData = JSON.parse(localStorage.getItem("contactData")) || [];
      savedData.push(data);
      localStorage.setItem("contactData", JSON.stringify(savedData));
  }
  
  function updatePaginationButtons(currentPage, totalPages) {
    const container = document.querySelector(".footer-container .right-footer");
    container.innerHTML = '';
  
    // Previous button
    const prevButton = document.createElement("button");
    prevButton.textContent = "<" + '\u00A0' + "Prev";
    prevButton.addEventListener("click", function () {
        if (currentPage > 1) {
            displayPage(currentPage - 1);
            updatePaginationButtons(currentPage - 1, totalPages);
        }
    });
    prevButton.style.padding = "8px";
    prevButton.style.border = "none";
    prevButton.style.backgroundColor = "#ffffff";
    container.appendChild(prevButton);
  
    for (let i = 1; i <= 3; i++) {
        const pageButton = document.createElement("button");
        pageButton.style.backgroundColor = i === currentPage ? "#d9d9d9" : "#ffff";
        pageButton.style.padding = "8px";
        pageButton.style.color = "rgba(0,0,0.1)";
        pageButton.style.border = "none";
  
        pageButton.textContent = i; 
        pageButton.addEventListener("click", function () {
            displayPage(i);
            updatePaginationButtons(i, totalPages);
        });
        container.appendChild(pageButton);
    }
  
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next" + '\u00A0' + ">";
  
    nextButton.addEventListener("click", function () {
        if (currentPage <= 3) {
            displayPage(currentPage + 1);
            updatePaginationButtons(currentPage + 1, totalPages);
        }
    });
    nextButton.style.padding = "8px";
    nextButton.style.border = "none";
    nextButton.style.backgroundColor = "#ffffff";
    container.appendChild(nextButton);
  
    displayPage(currentPage);
  }
  
  function displayPage(pageNumber) {
    const rows = contactTable.rows;
    const pageSize = 10;
    const start = (pageNumber - 1) * pageSize + 1;
    const end = pageNumber * pageSize;
  
    for (let i = 1; i < rows.length; i++) {
        if (i >= start && i <= end) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
  }
  