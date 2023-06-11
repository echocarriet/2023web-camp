const menuBurger = document.querySelector('.menu-burger');
const menuCollapse = document.querySelector('.menu-collapse');
const backToTop = document.querySelector('.backToTop');
const aiToolFormSearch = document.querySelector('.aiToolForm-search');
const filterBtnItem = document.querySelectorAll('.filterBtn-item');
const filterBtnCategory = document.querySelector('.filterBtn-category');
const filterBtnNewold = document.querySelector('.filterBtn-newold');
const dropdownNewoldGroup = document.querySelector('.dropdown-newoldGroup');
const aiToolCardSection = document.querySelector('.aiToolCard-section');
const pagination = document.querySelector('.pagination');
const apiPath = 'https://2023-engineer-camp.zeabur.app';

let dataInfo = [];
let dataPage = {};
const data = {
  type: '',
  sort: 0,
  page: 1,
  search: '',
}

function getData({ type, sort, page, search }) {
  const apiUrl = `${apiPath}/api/v1/works?sort=${sort}&page=${page}&${type ? `type=${type}&` : ''}${search ? `search=${search}` : ''}`;
  axios.get(apiUrl).then((res) => {
    dataInfo = res.data.ai_works.data;
    dataPage = res.data.ai_works.page;
    renderDataInfo(dataInfo);
    renderPagination(dataPage);
    filterCategory();
  })
    .catch((err) => {
      console.log(err);
    })
}

// AI工具王,卡片資料渲染到畫面
function renderDataInfo(data) {
  let str = '';
  data.forEach((item) => {
    str += `
    <li class="col-12 col-md-6 col-lg-4 mb-3 mb-lg-6">
            <div class="aiToolCard">
              <div class="aiToolCard-img">
                <img
                  src="${item.imageUrl}"
                  alt="${item.title}">
              </div>
              <div class="aiToolCard-body">
                <h3 class="aiToolCard-title">
                ${item.title}
                </h3>
                <p class="aiToolCard-text">
                  ${item.description}
                </p>
              </div>
              <ul>
                <li class="aiToolCard-list-item">
                  <p class="aiToolCard-list-title">${item.model}</p>
                  <p>${item.discordId}</p>
                </li>
                <li class="aiToolCard-list-item">
                  <a class="aiToolCard-hashtag" href="#">#${item.type}</a>
                  <a href="${item.link}">
                    <img
                      src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/2023web-camp/icons/share.png"
                      alt="Vector icon">
                  </a>
                </li>
              </ul>
            </div>
          </li>
    `;
  })
  aiToolCardSection.innerHTML = str;
}

// AI工具王,頁碼渲染
function renderPagination(num) {
  let str = '';
  let arrow = `<li class="page-item">
                  <a class="page-link ${!num.has_next ? 'disabled' : ''}" href="#">
                    <i class="bi bi-chevron-right"></i>
                  </a>
                </li>`;
  for (let i = 1; i <= num.total_pages; i++) {
    str += `
    <li class="page-item">
      <a class="page-link ${num.current_page == i ? 'active' : ''}" data-page="${i}" href="#">${i}</a>
    </li>
    `
  }
  pagination.innerHTML = str + arrow;
  changePagination(dataPage);
}

// AI工具王,頁碼切換
function changePagination(dataPage) {
  const pageLinks = document.querySelectorAll('.page-link');
  let pageId = '';
  pageLinks.forEach((page) => {
    page.addEventListener('click', (e) => {
      e.preventDefault();
      pageId = e.target.dataset.page;
      data.page = Number(pageId);
      if (!pageId) {
        data.page = Number(dataPage.current_page) + 1
      }
      getData(data);
    })
  })

}

// AI工具王,關鍵字搜尋
aiToolFormSearch.addEventListener('keydown', (e) => {
  data.search = (aiToolFormSearch.value).trim();
  data.page = 1
  getData(data);
})

// AI工具王,渲染作品type
let categoryType = []; // 撈出資料庫中所有作品種類
function filterCategory() {
  dataInfo.forEach((item) => {
    let result = -1;
    categoryType.forEach((x, y) => {
      if (x.category === item.type) {
        result = y;
      }
    })
    if (result === -1) {
      let obj = {
        category: item.type,
      }
      categoryType.push(obj);
    }
  })
  let str = '';
  categoryType.forEach((item) => {
    str += `
    <li>
      <button type="button" class="filterBtn-item ${item.category == data.type ? 'active' : ''}">${item.category}</button>
    </li>
    `;
  })

  filterBtnCategory.innerHTML =
    `<li>
  <button type="button" class="filterBtn-item ${data.type == '' ? 'active' : ''}">全部</button>
  </li>`+ str;

}

// AI工具王,篩選作品種類
filterBtnCategory.addEventListener('click', (e) => {
  if (e.target.textContent === '全部') {
    data.type = '';
  } else {
    data.type = e.target.textContent;
  }

  getData(data);
})


// AI工具王,切換作品新舊排序
filterBtnNewold.addEventListener('click', (e) => {
  dropdownNewoldGroup.classList.toggle('active');
})
dropdownNewoldGroup.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.innerHTML === '由新到舊') {
    data.sort = 0;
    getData(data);
    filterBtnNewold.innerHTML = '由新到舊  <i class="bi bi-chevron-down"></i>';
    dropdownNewoldGroup.classList.remove('active');
  } else if (e.target.innerHTML === '由舊到新') {
    data.sort = 1;
    getData(data);
    filterBtnNewold.innerHTML = '由舊到新  <i class="bi bi-chevron-down"></i>';
    dropdownNewoldGroup.classList.remove('active');
  }
})

// MENU
menuBurger.addEventListener('click', (e) => {
  e.preventDefault();
  menuCollapse.classList.toggle('active');

  console.log('koko');
})
// backToTop
backToTop.addEventListener('click', (e) => {
  window.scrollTo({ top: 0 });
  // scrollToTop();
})



getData(data);