document.addEventListener("DOMContentLoaded", () => {
  const contentElement = document.getElementById("content");
  const paginationElement = document.getElementById("pagination");

  const itemsPerPage = 1;
  let currentPage = 1;
  let totalPages;
  let changelogItems = [];

  fetch(
    "https://raw.githubusercontent.com/Jalenzzz/JailbreakChangelogs-test/master/changelogs/21-6-24.txt",
    {
      mode: "cors",
    }
  )
    .then((response) => response.text())
    .then((data) => {
      const lines = data.split("\n");

      let currentItem = "";

      lines.forEach((line) => {
        if (line.startsWith("# ")) {
          if (currentItem) {
            changelogItems.push(currentItem);
            currentItem = "";
          }
          currentItem = `<h1>${line.substring(2)}</h1>`;
        } else if (line.startsWith("- - ")) {
          currentItem += `<p><span class="bullet">•</span> <span class="sub-bullet">•</span> ${line.substring(
            4
          )}</p>`;
        } else if (line.startsWith("## ")) {
          currentItem += `<h2>${line.substring(3)}</h2>`;
        } else if (line.startsWith("- ")) {
          currentItem += `<p><span class="bullet">•</span> ${line.substring(
            2
          )}</p>`;
        } else if (line.startsWith("- - - ")) {
          currentItem += `<p><span class="bullet">•</span> <span class="sub-bullet">•</span>  ${line.substring(
            4
          )}</p>`;
        } else {
          currentItem += `<p>${line}</p>`;
        }
      });

      if (currentItem) {
        changelogItems.push(currentItem);
      }

      changelogItems = changelogItems.reverse();
      totalPages = Math.ceil(changelogItems.length / itemsPerPage) || 1;
      renderChangelogs();
      renderPagination();
    })
    .catch((error) => {
      console.error("Error fetching the changelog:", error);
      contentElement.innerHTML =
        "<p>Error loading changelog. Please try again later.</p>";
    });

  function renderChangelogs() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = changelogItems.slice(startIndex, endIndex);

    let contentHtml = "";
    currentItems.forEach((item) => {
      contentHtml += item;
    });

    contentElement.innerHTML = contentHtml;
  }

  function renderPagination() {
    let paginationHtml = "";

    if (currentPage > 1) {
      paginationHtml += `<button onclick="goToPage(${
        currentPage - 1
      })">Previous</button>`;
    }

    const maxPages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    const endPage = Math.min(totalPages, startPage + maxPages - 1);

    // Add "First Page" button
    if (startPage > 1) {
      paginationHtml += `<button onclick="goToPage(1)">First</button>`;
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationHtml += `<button onclick="goToPage(${i})" ${
        i === currentPage ? 'class="active"' : ""
      }>${i}</button>`;
    }

    if (currentPage < totalPages) {
      paginationHtml += `<button onclick="goToPage(${
        currentPage + 1
      })">Next</button>`;
      paginationHtml += `<button onclick="goToPage(${totalPages})">>></button>`;
    }

    paginationElement.innerHTML = paginationHtml;
  }

  function updateSidebarImage(pageNumber) {
    const sidebarImage = document.querySelector(".sidebar-image");
    sidebarImage.src = pageImages[pageNumber - 1]; // Subtract 1 to match array index
  }
  const pageImages = [
    "https://i.ibb.co/khp1j9X/image.png", // Image for Page 1
    "https://i.ibb.co/0rp83KV/image.png",
    "https://i.ibb.co/G93HtCY/image.png",
    "https://i.ibb.co/3z2StWY/image.png",
    "https://i.ibb.co/4VWCz2Z/image.png",
    "https://i.ibb.co/f2jXXvb/image.png",
    "https://i.ibb.co/PwSh701/image.png",
    "https://i.ibb.co/rGVzk0T/image.png",
    "https://i.ibb.co/gJF95yJ/image.png",
    "https://i.ibb.co/kM78rHt/image.png",
    "https://i.ibb.co/qdpLvXZ/image.png",
    "https://i.ibb.co/gmmV4L2/image.png",
    "https://i.ibb.co/WFMVj8n/image.png",
    "https://i.ibb.co/MVhtsYM/image.png",
    "https://i.ibb.co/CPfcZ2G/image.png",
    "https://i.ibb.co/djgQK3h/image.png",
    "https://i.ibb.co/djgQK3h/image.png",
    "https://i.ibb.co/gRgxrtN/image.png",
    "https://i.ibb.co/QHfpQng/image.png",
    "https://i.ibb.co/TPMYpTY/image.png",
    "https://i.ibb.co/d7YzFzb/image.png",
    "https://i.ibb.co/wyRttVD/image.png",
    "https://i.ibb.co/bQNGJzH/image.png",
    "https://i.ibb.co/Kx9K4Zd/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/ZV5g892/image.png",
    "https://i.ibb.co/Jcb8jj7/image.png",
    "https://i.ibb.co/8KmmBYW/image.png",
    "https://i.ibb.co/FX1KCjh/image.png",
    "https://i.ibb.co/1758wyK/image.png",
    "https://i.ibb.co/5vdcVYL/image.png",
    "https://i.ibb.co/LrF5yXH/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/FJhr4my/image.png",
    "https://i.ibb.co/XWTT2QV/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/Xp4LDcv/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/dmt3mTT/OldShift.gif",
    "https://i.ibb.co/VQQrDC7/image.png",
    "https://i.ibb.co/wc2NDTb/image.png",
    "https://i.ibb.co/F3D39x9/image.png",
    "https://i.ibb.co/cFLNTKk/image.png",
    "https://i.ibb.co/2Z1N8yb/image.png",
    "https://i.ibb.co/VjCMfM8/image.png",
    "https://i.ibb.co/X8XNtR0/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/Z6SpHXd/image.png",
    "https://i.ibb.co/5GtFFgR/image.png",
    "https://i.ibb.co/B2bwsrz/image.png",
    "https://i.ibb.co/Th0CpgH/image.png",
    "https://i.ibb.co/LknPdxh/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/84Wd0sp/image.png",
    "https://i.ibb.co/L17PDmM/image.png",
    "https://i.ibb.co/VYVjJt1/image.png",
    "https://i.ibb.co/ZTF0jtB/image.png",
    "https://i.ibb.co/RBRP3TG/image.png",
    "https://i.ibb.co/dKKNVYP/image.png",
    "https://i.ibb.co/XLcKgPK/image.png",
    "https://i.ibb.co/N90CsZ4/image.png",
    "https://i.ibb.co/PTSDdMH/image.png",
    "https://i.ibb.co/Mk4yYMZ/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/qrHyvb6/image.png",
    "https://i.ibb.co/TrbFJXw/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/PrR1gHW/image.png",
    "https://i.ibb.co/gTRKJf4/image.png",
    "https://i.ibb.co/ByZ9bgR/image.png",
    "https://i.ibb.co/56pxyJc/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/fMgNZkV/image.png",
    "https://i.ibb.co/cDCzrCY/image.png",
    "https://i.ibb.co/3YCMFG7/image.png",
    "https://i.ibb.co/V9xjKQp/image.png",
    "https://i.ibb.co/B6Xvnyw/image.png",
    "https://i.ibb.co/0sKQGmh/image.png",
    "https://i.ibb.co/qr8CVJY/image.png",
    "https://i.ibb.co/BZX0Kbj/image.png",
    "https://i.ibb.co/JjtFsLH/image.png",
    "https://i.ibb.co/0KTmJGD/image.png",
    "https://i.ibb.co/SRf5C50/image.png",
    "https://i.ibb.co/mSj53sB/image.png",
    "https://i.ibb.co/984nbPt/image.png",
    "https://i.ibb.co/fqncx1q/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/RPpg7h4/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/mqCzDFV/image.png",
    "https://i.ibb.co/vjTjgzq/image.png",
    "https://i.ibb.co/mBzdh4j/image.png",
    "https://i.ibb.co/1QhKyGF/image.png",
    "https://i.ibb.co/3pGSH6h/image.png",
    "https://i.ibb.co/jJYwGfS/image.png",
    "https://i.ibb.co/Htx2qJN/image.png",
    "https://i.ibb.co/ZzNdp9s/image.png",
    "https://i.ibb.co/T4JYhpy/image.png",
    "https://i.ibb.co/VgcHrN4/image.png",
    "https://i.ibb.co/X2N0nJD/image.png",
    "https://i.ibb.co/LgLtXJJ/image.png",
    "https://i.ibb.co/D8drKcW/image.png",
    "https://i.ibb.co/2yBSRxN/image.png",
    "https://i.ibb.co/pr7PjCM/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/jvqtKRJ/image.png",
    "https://i.ibb.co/xFgvzv7/image.png",
    "https://i.ibb.co/JdFvQgS/image.png",
    "https://i.ibb.co/PCtQRDm/image.png",
    "https://i.ibb.co/R7Cs7Q4/image.png",
    "https://i.ibb.co/YyrzBVY/image.png",
    "https://i.ibb.co/ZcrhVj6/image.png",
    "https://i.ibb.co/Lg1RdpR/image.png",
    "https://i.ibb.co/LgV3Q9j/image.png",
    "https://i.ibb.co/Qnj0Tpd/image.png",
    "https://i.ibb.co/hMNT3Bd/image.png",
    "https://i.ibb.co/ryVnQwy/image.png",
    "https://i.ibb.co/ypxQw0d/image.png",
    "https://i.ibb.co/SV9X03B/image.png",
    "https://i.ibb.co/mNt3BVq/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/CMk931D/image.png",
    "https://i.ibb.co/7rfQjmX/image.png",
    "https://i.ibb.co/fkBfkdC/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/8YrbmzY/image.png",
    "https://i.ibb.co/1RLZPhw/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/7jxM9vW/image.png",
    "https://i.ibb.co/bX9TTPH/image.png",
    "https://i.ibb.co/rZPcWdZ/image.png",
    "https://i.ibb.co/q9DZTCV/image.png",
    "https://i.ibb.co/3cMCtFy/image.png",
    "https://i.ibb.co/v4FwRBZ/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/r40kmFV/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/sgdC29W/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/qRCgBws/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/QCVYB8H/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/2dc9YBD/image.png",
    "https://i.ibb.co/x3DhhKf/image.png",
    "https://i.ibb.co/2cdJvW7/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/G2jmV09/image.png",
    "https://i.ibb.co/XVCDp8d/image.png",
    "https://i.ibb.co/Ltfp2pR/image.png",
    "https://i.ibb.co/NLtSVT8/image.png",
    "https://i.ibb.co/dWBHRPD/image.png",
    "https://i.ibb.co/JvynPPj/image.png",
    "https://i.ibb.co/t495Yb2/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail
    "https://i.ibb.co/Fg6pCgw/image.png",
    "https://i.ibb.co/6swyLb6/image.png",
    "https://i.ibb.co/CBQRKqP/image.png",
    "https://i.ibb.co/Z6t0qJw/image.png",
    "https://i.ibb.co/yBJRW8P/image.png",
    "https://i.ibb.co/kSM33G4/image.png",
    "https://i.ibb.co/fC4t6rz/image.png",
    "https://i.ibb.co/3dgp780/image.png", // default image for no thumbnail - last page
  ];
  window.goToPage = (pageNumber) => {
    currentPage = pageNumber;
    renderChangelogs();
    renderPagination();
    updateSidebarImage(pageNumber);
  };
  updateSidebarImage(1); // Set the image for the initial page
});
