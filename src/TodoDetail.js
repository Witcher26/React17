import { useParams, Navigate } from 'react-router-dom';

export default function TodoDetail(props) {
    const { key } = useParams();// т.е. в URL будет 1 параметр, который присвоится в key
    const deed = props.getDeed(key);

    if (!props.currentUser)
        return <Navigate to="/login" replace />;
    else
        return (
            <section>
                {deed.done &&
                    <p className="has-text-success">
                        Выполнено
                    </p>
                }
                <h1>{deed.title}</h1>
                <p>{deed.createdAt.toLocaleString()}</p>
                {deed.desc && <p>{deed.desc}</p>}
                {deed.image && <p><img src={deed.image}
                    alt="Иллюстрация" /></p>}
            </section>
        );
}