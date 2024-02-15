import { useDispatch, useSelector } from "react-redux";
import peluqueriaApi from "../api/peluqueriaApi";
import { onLoadUsers } from "../store/admin/adminSlice";

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
    try {
      let response;
      if (isNaN(values.id)) {
        response = await peluqueriaApi.get(
          "/report/2024-02-13T03:13:32.012Z/2024-02-13T03:13:32.012Z",
          {
            responseType: "blob",
          }
        );

        const url = window.URL.createObjectURL(
          new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
        );

        return url;
      } else {
        console.log(values.id);
      }
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
