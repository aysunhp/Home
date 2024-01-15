import { Formik } from "formik";
import { postArtist, PostedArtist } from "../../redux/slices/ArtistSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
const AddArtist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handlePost = async (item: PostedArtist) => {
    try {
      await dispatch(postArtist(item));
    } catch (error) {
      console.error("Error posting artist:", error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ name: "", age: "", gender: "", genre: "" }}
        onSubmit={(values, actions) => {
          console.log(values);
          console.log(actions);
          handlePost(values);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.name}
              name="name"
            />
            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            <br />
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.age}
              name="age"
            />
            {props.errors.age && <div id="feedback">{props.errors.age}</div>}

            <br />
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.gender}
              name="gender"
            />
            {props.errors.gender && (
              <div id="feedback">{props.errors.gender}</div>
            )}
            <br />
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.genre}
              name="genre"
            />
            {props.errors.genre && (
              <div id="feedback">{props.errors.genre}</div>
            )}
            <br />
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddArtist;
