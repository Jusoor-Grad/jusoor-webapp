/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/shared/api/axiosConfig";
import i18n from "../../i18n";
import { showFlashMessage } from "./notifications";
import { formulateErrorMessage } from "@/shared/utils/formulateErrorMessage";

const initialState = {
  getSurveysStatus: "idle",
  getSurveyQuestionsStatus: "idle",
  createSurveyStatus: "idle",
  createTextOrMcqQuestionStatus: "idle",
  surveyQuestions: null,
  surveys: null,
};

export const getSurveys = createAsyncThunk(
  "surveys/getSurveys",
  async (data, thunkAPI) => {
    const { query } = data;

    const response = await axiosInstance.get(`surveys/?${query}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status < 200 || response.status >= 300) {
      thunkAPI.dispatch(
        showFlashMessage({
          message: formulateErrorMessage(response.data),
          severity: "error",
        })
      );
      return thunkAPI.rejectWithValue(response.data);
    } else {
      return response.data;
    }
  }
);

export const getSurveyQuestions = createAsyncThunk(
  "surveys/getSurveyQuestions",
  async (data, thunkAPI) => {
    const { query } = data;

    const response = await axiosInstance.get(`survey-questions/?${query}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status < 200 || response.status >= 300) {
      thunkAPI.dispatch(
        showFlashMessage({
          message: formulateErrorMessage(response.data),
          severity: "error",
        })
      );
      return thunkAPI.rejectWithValue(response.data);
    } else {
      return response.data;
    }
  }
);

export const createSurvey = createAsyncThunk(
  "surveys/createSurvey",
  async (data, thunkAPI) => {
    const response = await axiosInstance.post(`surveys/`, data, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status < 200 || response.status >= 300) {
      thunkAPI.dispatch(
        showFlashMessage({
          message: formulateErrorMessage(response.data),
          severity: "error",
        })
      );
      return thunkAPI.rejectWithValue(response.data);
    } else {
      thunkAPI.dispatch(
        showFlashMessage({
          message: i18n.t("surveys.createdSuccessfully"),
          severity: "success",
        })
      );
      thunkAPI.dispatch(getSurveys({ query: "" }));
      return response.data;
    }
  }
);

export const createTextOrMcqQuestion = createAsyncThunk(
  "surveys/createTextOrMcqQuestion",
  async (data, thunkAPI) => {
    const { type, payload } = data;
    const response = await axiosInstance.post(
      `survey-questions/${type}/`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status < 200 || response.status >= 300) {
      thunkAPI.dispatch(
        showFlashMessage({
          message: formulateErrorMessage(response.data),
          severity: "error",
        })
      );
      return thunkAPI.rejectWithValue(response.data);
    } else {
      thunkAPI.dispatch(
        showFlashMessage({
          message: i18n.t("surveys.createdQuestionSuccessfully"),
          severity: "success",
        })
      );

      thunkAPI.dispatch(
        getSurveyQuestions({ query: `survey=${payload.survey}` })
      );

      return response.data;
    }
  }
);

export const surveysSlice = createSlice({
  name: "surveys",
  initialState,
  reducers: {
    flushSurveys: (state, action) => {
      return { ...initialState };
    },
    flushSurveyQuestions: (state, action) => {
      state.surveyQuestions = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSurveys.fulfilled, (state, action) => {
      state.getSurveysStatus = "succeeded";
      state.surveys = action.payload.data;
    });
    builder.addCase(getSurveys.pending, (state, action) => {
      state.getSurveysStatus = "loading";
    });
    builder.addCase(getSurveys.rejected, (state, action) => {
      state.getSurveysStatus = "failed";
    });
    builder.addCase(getSurveyQuestions.fulfilled, (state, action) => {
      state.getSurveyQuestionsStatus = "succeeded";
      state.surveyQuestions = action.payload.data;
    });
    builder.addCase(getSurveyQuestions.pending, (state, action) => {
      state.getSurveyQuestionsStatus = "loading";
    });
    builder.addCase(getSurveyQuestions.rejected, (state, action) => {
      state.getSurveyQuestionsStatus = "failed";
    });
    builder.addCase(createSurvey.fulfilled, (state, action) => {
      state.createSurveyStatus = "succeeded";
    });
    builder.addCase(createSurvey.pending, (state, action) => {
      state.createSurveyStatus = "loading";
    });
    builder.addCase(createSurvey.rejected, (state, action) => {
      state.createSurveyStatus = "failed";
    });
    builder.addCase(createTextOrMcqQuestion.fulfilled, (state, action) => {
      state.createTextOrMcqQuestionStatus = "succeeded";
    });
    builder.addCase(createTextOrMcqQuestion.pending, (state, action) => {
      state.createTextOrMcqQuestionStatus = "loading";
    });
    builder.addCase(createTextOrMcqQuestion.rejected, (state, action) => {
      state.createTextOrMcqQuestionStatus = "failed";
    });
  },
});

export default surveysSlice.reducer;
export const { flushSurveys, flushSurveyQuestions } = surveysSlice.actions;
