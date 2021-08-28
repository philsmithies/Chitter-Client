import "./index.css";

export default function Banner(props) {
  return (
    <div className="bannerimg">
      <img src={process.env.PUBLIC_URL + "/img/banner.jpg"} alt="banner"></img>
    </div>
  );
}
