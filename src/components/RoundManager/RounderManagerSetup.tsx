import React, { useEffect, useRef, useState } from "react";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import RoundSettingsCard from "./RoundSettingsCard";
import RoundManagerCategoriesCard from "./components/RoundManagerCategoriesCard";
import RoundManagerMiniGameCard from "./components/RoundManagerMiniGameCard";
import RoundManagerOrderCard from "./components/RoundManagerOrderCard";
import {
  CreateRoundManager,
  GetMiniGames,
  GetRoundManager,
  UpdateRoundManager,
} from "../../services/RoundManagerService";
import { handleHttpReq } from "../../utils/HandleHttpReq";
import { Form, Formik } from "formik";
import { GetCategoriesResponse } from "../../types/CategoryTypes";
import {
  IRoundManager,
  roundOrderCategory,
  roundOrderMiniGame,
} from "../../types/RoundManagerTypes";
import * as Yup from "yup";
import ErrorList from "../ErrorList";
import Loader from "../Loader/loader";
import { showNotificationMessage } from "../../utils/toast";

const validationSchema = Yup.object().shape({
  isManual: Yup.string()
    .oneOf(["Auto", "Manual"], "Mode must be Auto or Manual")
    .required("Mode is required"),
  roundOrder: Yup.array().min(1, "At least one round order item is required"),
  roundSettings: Yup.object().shape({
    suggestBreak: Yup.boolean(),
    breakDuration: Yup.number().required("Break Duration required"),
    pauseAfterRule: Yup.number().required("Pause After Rule required"),
    pauseAfterQuestion: Yup.number().required("Pause After Question required"),
  }),
});

const RounderManagerSetup = () => {
  const navigate = useNavigate();

  const [miniGames, setMiniGames] = useState<string[]>([]);
  const [roundManagerPreset, setRoundManagerPreset] =
    useState<IRoundManager | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const [miniGameRes, rmPresetRes] = await Promise.all([
      GetMiniGames(),
      GetRoundManager(),
    ]);

    const miniGames = miniGameRes.data.data;
    setMiniGames(miniGames);

    const roundManager = rmPresetRes.data.data;

    setRoundManagerPreset(roundManager);
    setLoading(false);
  };

  useEffect(() => {
    handleHttpReq(fetchData);
  }, []);

  const initialValues = {
    isManual: roundManagerPreset
      ? roundManagerPreset?.isManual
        ? "Manual"
        : "Auto"
      : "Manual",
    roundOrder: roundManagerPreset?.roundOrder || [],
    roundSettings: {
      suggestBreak: roundManagerPreset?.roundSettings.suggestBreak || false,
      breakDuration: roundManagerPreset?.roundSettings.breakDuration || 1,
      pauseAfterRule: roundManagerPreset?.roundSettings.pauseAfterRule || 1,
      pauseAfterQuestion:
        roundManagerPreset?.roundSettings.pauseAfterQuestion || 1,
    },
  };
  const errorListRef = useRef<HTMLDivElement | null>(null);
  const formikRef = useRef<any>(null);

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        isManual: values.isManual === "Manual",
      };

      if (roundManagerPreset) {
        await UpdateRoundManager(payload, roundManagerPreset._id);
        showNotificationMessage(
          "Success",
          "Successfully updated round manager settings",
          "success"
        );
      } else {
        await CreateRoundManager(payload);
        showNotificationMessage(
          "Success",
          "Successfully created round manager settings",
          "success"
        );
      }
      await fetchData();
    } catch (error) {
      showNotificationMessage(
        "Error",
        "Error during submitting round manager settings",
        "success"
      );
      console.error("Error during save:", error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) =>
        handleHttpReq(() => onSubmit(values, { setSubmitting }))
      }
    >
      {({ values, handleSubmit, setFieldValue, validateForm }) => {
        const handleAddCategory = (category: GetCategoriesResponse) => {
          if (
            !values.roundOrder.some(
              (item) =>
                item.type === "category" && item.categoryId === category._id
            )
          ) {
            setFieldValue("roundOrder", [
              ...values.roundOrder,
              {
                type: "category",
                categoryId: category._id,
                categoryName: category.name,
              },
            ]);
          }
        };

        const handleAddMiniGame = (minigame: string, index: number) => {
          if (
            !values.roundOrder.some(
              (item) => item.type === "minigame" && item.index === index
            )
          ) {
            setFieldValue("roundOrder", [
              ...values.roundOrder,
              { type: "minigame", minigame, index },
            ]);
          }
        };

        const handleRemove = (
          itemToRemove: roundOrderCategory | roundOrderMiniGame
        ) => {
          setFieldValue(
            "roundOrder",
            values.roundOrder.filter((item) => item !== itemToRemove)
          );
        };

        return (
          <Form>
            <Header
              pageTitle="Round Manager"
              showRightButton={true}
              rightButtonText="Save Setup"
              rightButtonIcon="/images/header/save-icon.png"
              onBackClick={() => navigate("/")}
              onRightButtonClick={async () => {
                const errors = await validateForm();
                if (Object.keys(errors).length > 0 && errorListRef.current) {
                  errorListRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                } else {
                  handleSubmit();
                }
              }}
              RightButtonProps={{
                rightButtonAxis: "35%",
                rightButtonIconAxis: "15%",
              }}
            />
            <div className="round-manager-wrapper">
              <div className="round-manager-main-container">
                <div className="round-manager-left-container">
                  <RoundManagerCategoriesCard
                    type="green"
                    title="Round Mode"
                    onSelect={handleAddCategory}
                    selectedIds={values.roundOrder
                      .filter((item) => item.type === "category")
                      .map((item) => item.categoryId)}
                  />
                  <RoundManagerMiniGameCard
                    type="magenta"
                    title="Mini Game"
                    data={miniGames}
                    onSelect={handleAddMiniGame}
                    selectedIndexes={values.roundOrder
                      .filter((item) => item.type === "minigame")
                      .map((item) => item.index)}
                  />
                </div>
                <div className="round-manager-middle-container">
                  <RoundSettingsCard />
                </div>
                <div className="round-manager-right-container">
                  <RoundManagerOrderCard
                    type="basic"
                    title="Round Order"
                    data={values.roundOrder}
                    onRemove={handleRemove}
                  />
                </div>
              </div>
            </div>
            <div ref={errorListRef}>
              <ErrorList />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RounderManagerSetup;
