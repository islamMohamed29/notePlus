import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getNotes } from "../redux/slices/notes-slice.js";
import Note from "./Note";
import LoadingScreenActions from "../utils/LoadingScreenActions";
export default function Notes() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const loadingGetNotes = useSelector((state) => state.notes.loadingGetNotes);
  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);
  return (
    <>
      {loadingGetNotes && <LoadingScreenActions />}
      <div className="notes">
        <div className="header-note-section">
          <h2 className="m-0">Your Notes</h2>
        </div>
        {!loadingGetNotes && (
          <div className="row g-4">
            {notes.map((note, index) => {
              return (
                <div className="col-lg-4 col-md-6">
                  <Note note={note} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
