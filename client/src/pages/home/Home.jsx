import styles from './home.module.css';
import Search from '../../components/search/Search';
import Trending from '../../components/trending/Trending';

const Home = () => {
  return (
    <div className={styles.container}>
      <Search />
      <Trending />
      {/* PLAN TRIP */}
      <div className={styles.plan}>
        <h1>Start planning your next trip</h1>
        <div className={styles.offerList}>
          <div className={styles.offers}>
            <div className={styles.content}>
              <img src="https://images.unsplash.com/photo-1651510709022-e3b9d1e32950?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
              <div className={styles.title}>Sunny beach hotel offers</div>
            </div>
          </div>
          <div className={styles.offers}>
            <div className={styles.content}>
              <img src="https://plus.unsplash.com/premium_photo-1661290470322-a313098e7c2a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyJTIwcmVudHxlbnwwfHwwfHx8MA%3D%3D" alt="" />
              <div className={styles.title}>Car rental deals</div>
            </div>
          </div>
          <div className={styles.offers}>
            <div className={styles.content}>
              <img src="https://images.unsplash.com/photo-1565093760800-ebf13e849364?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
              <div className={styles.title}>Member Discounts</div>
            </div>
          </div>
          <div className={styles.offers}>
            <div className={styles.content}>
              <img src="https://images.unsplash.com/photo-1645447556627-137df9819feb?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
              <div className={styles.title}>Vacation rental offers</div>
            </div>
          </div>
        </div>
      </div>
      {/* APP DOWNLOAD */}
      <div className={styles.app}>
        <h1>Here to help keep you on the move</h1>
        <div className={styles.appContent}>
          <div className={styles.picture}>
            <div className={styles.appImage}>
              <img src="https://images.unsplash.com/photo-1607321048304-085f30270745?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGhvbmUlMjBhcHBsaWNhdGlvbnN8ZW58MHx8MHx8fDA%3D" alt="" />
            </div>
          </div>
          <div className={styles.appDesc}>
            <h1>Wander Wisely with the Travelocity App</h1>
            <ul>
              <li>Get helpful alerts about flight status and gate numbers</li>
              <li>Access all your travel details, even when offline</li>
              <li>Easily contact your hotel by messaging them right in the app</li>
            </ul>
            <p>Scan the QR code with your device camera and download our app</p>
            <div className={styles.qr}>
            <img src="./qr-code.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home