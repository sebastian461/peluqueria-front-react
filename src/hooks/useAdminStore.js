import { useDispatch, useSelector } from "react-redux";
import peluqueriaApi from "../api/peluqueriaApi";
import { onLoadUsers } from "../store/admin/adminSlice";
import { saveAs } from "file-saver";
import { parseISO } from "date-fns";

export const useAdminStore = () => {
  const { users } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const startLoadUsers = async () => {
    try {
      const { data } = await peluqueriaApi.get("/user");
      const { users } = data.data;

      dispatch(onLoadUsers(users));
    } catch (error) {
      console.log(error);
    }
  };

  const startGenerateReport = async (values) => {
    const formatStart = values.start
      .toString()
      .replace(" (hora de Ecuador)", "");
    const formatEnd = values.end.toString().replace(" (hora de Ecuador)", "");

    try {
      let response;
      let document;
      if (isNaN(values.id)) {
        response = await peluqueriaApi.get(
          `/report/${formatStart}/${formatEnd}`,
          {
            responseType: "blob",
          }
        );
      } else {
        response = await peluqueriaApi.get(
          `/reportId/${values.id}/${formatStart}/${formatEnd}`,
          {
            responseType: "blob",
          }
        );
      }

      document = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(document, "reporte");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //* Propiedades
    users,

    //* Métodos
    startLoadUsers,
    startGenerateReport,
  };
};
