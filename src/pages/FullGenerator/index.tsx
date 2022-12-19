import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullGenerator: React.FC = () => {
  const [generator, setGenerator] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetch() {
      try {
        const { data } = await axios.get(
          "https://6395b78390ac47c68071b12a.mockapi.io/generators/" + id
        );
        setGenerator(data);
      } catch (error) {
        alert("Ошибка при получению генератора");
        navigate("/");
      }
    }

    fetch();
  }, []);

  if (!generator) {
    return <>Загрузка...</>;
  }
  return (
    <div className="container">
      <img src={generator.imageUrl} />
      <h2>{generator.title}</h2>
      <h4> Ціна: {generator.price} грн</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullGenerator;
