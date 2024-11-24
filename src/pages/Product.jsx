import MainNav from "../components/MainNav";
import styles from "./Product.module.css";

function Product() {
    return (
        <main className={styles.product}>
            <MainNav/>
            <section>
                <img src="/src/assets/image-1.jpg" alt="a man standing with a camera"/>
                <div>
                    <h2>About WorldWise</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Illo est dicta illum vero culpa cum quaerat
                        architecto sapiente eius non soluta, molestiae
                        nihil laborum, placeat debitis, laboriosam at fuga
                        perspiciatis?
                    </p>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Corporis doloribus libero sunt expedita
                        ratione iusto, magni, id sapiente sequi officiis et.
                    </p>
                </div>
            </section>
        </main>
    );
}

export default Product;