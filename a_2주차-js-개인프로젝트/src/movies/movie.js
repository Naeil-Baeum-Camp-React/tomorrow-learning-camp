// DOM 생성시 실행할 내용
document.addEventListener("DOMContentLoaded", function () {
    init();

    // 엔터 키를 눌렀을 경우
    searchBtn().addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            moviesSearch(event).catch(r => console.log(r));
        }
    });
});

/**
 * 검색 input 포커스
 * 굳이 함수로 뺀 이유는 addEventListener() 에서도 addEventListener() 함수 밖에서도  공통으로 사용할 수 있도록 하기위해서
 * */
const searchBtn = () => document.getElementById('moviesSearch');
const MOVIE_AUTHORIZATION = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTdkNzk3NGIzMjgwYmRmOTZlZjg1NWU1MTMxN2M1MiIsInN1YiI6IjY2MjhhZjE0NjJmMzM1MDE3ZGRkODExZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x99VH7JhCrWPg4YsHp8M8jKEpwnjhIX0Vyd3LNkc49o'

/**
 * 버튼 초기셋팅
 * */
const searchBtnInit = () => {
    searchBtn().value = "";
    searchBtn().focus();
}


/**
 * 초기 셋팅
 * */
const init = () => {
    searchBtnInit();
    getMovies().catch(err => console.error(err));
}

/**
 * 영화 목록 조회
 * */
const getMovies = async () => {
    document.querySelector('.movies').innerHTML = ""
    const URL = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
    let response = await fetchUtils.get(URL, (method) => setOptions(method, 'application/json', MOVIE_AUTHORIZATION));

    response.results
        .filter(movie => movie.poster_path !== null)
        .forEach((movie) => {
            let html = makeMovieHtml(movie);
            document.querySelector('.movies').innerHTML += html;
        })

    searchBtnInit();
}

/**
 * 영화 상세
 * */
const getMovieDetail = (id) => alert(id);

/**
 * 영화 검색
 * */
const moviesSearch = async (event) => {
    if (event !== undefined) {
        event.preventDefault()
    }

    let keyword = document.getElementById("moviesSearch").value;

    if (keyword !== "") {
        const URL = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=1`;
        let response = await fetchUtils.get(URL, (method) => setOptions(method, 'application/json', MOVIE_AUTHORIZATION));

        if (response.results.length == 0) {
            alert("검색 결과가 없습니다.");
            await init();
            return;
        }

        document.querySelector('.movies').innerHTML = "";
        response.results
            .filter(movie => movie.poster_path !== null)
            .forEach(movie => {
                let html = makeMovieHtml(movie);
                document.querySelector('.movies').innerHTML += html;
            })

    } else {
        alert("검색어를 입력해주세요.");

    }
    searchBtnInit();
}

/**
 * html 생성
 * */
const makeMovieHtml = (movie) => {
    return `
                            <div class="col movie" onclick="getMovieDetail(${movie.id})">
                                <div class="card h-100">
                                    <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
                                         class="movie-img-top" alt="..." id="movie-image">
                                    <div class="card-body">
                                        <h5 class="movie-title">${movie.title}</h5>
                                        <p>${movie.vote_average}</p>
                                        <p class="movie-comment">${movie.overview}</p>
                                    </div>
                                </div>
                            </div>
                        `;
}

