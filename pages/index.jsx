import axios from 'axios';

function HomePage({ articles }) {
  return (
    <div>
      <h1>최근 경제 뉴스</h1>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const apiKey = 'RW4Ghu5beUKFz126BGrf'; // 네이버 API 키
  const keyword = '주식'; // 검색할 키워드

  try {
    const response = await axios.get(
      `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(keyword)}`,
      {
        headers: {
          'X-Naver-Client-Id': apiKey,
          'X-Naver-Client-Secret': 'b2GG0yPCqO',
        },
      }
    );

    const articles = response.data.items.slice(0, 10); //무료 api는 10개 최대임 

    return {
      props: { articles },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { articles: [] },
    };
  }
}

export default HomePage;