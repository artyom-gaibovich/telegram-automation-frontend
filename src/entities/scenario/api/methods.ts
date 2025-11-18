import type { Scenario } from '@entities/scenario/api/types';
import { ApiService } from '@shared/services';

const create = async (body: Scenario.Api.CreateScenario.Request.Data) => {
  const { data } =
    await ApiService().post<Scenario.Api.CreateScenario.Response.Data>(
      `/scenario`,
      body,
    );
  return data;
};

const getOne = async (id: string) => {
  const { data } =
    await ApiService().get<Scenario.Api.GetOneScenario.Response.Data>(
      `/scenario/${id}`,
    );
  return data;
};

const getList = async () => {
  const { data } =
    await ApiService().get<Scenario.Api.GetScenarioList.Response.Data>(
      `/scenario/list`,
    );
  return data;
};

const update = async (
  id: string,
  dto: Scenario.Api.UpdateScenario.Request.Data,
) => {
  const { data } =
    await ApiService().patch<Scenario.Api.UpdateScenario.Response.Data>(
      `/scenario/${id}`,
      dto,
    );
  return data;
};

const remove = async (id: string) => {
  const { data } =
    await ApiService().delete<Scenario.Api.DeleteScenario.Response.Data>(
      `/scenario/${id}`,
    );
  return data;
};

export const scenarioApi = {
  create,
  getOne,
  getList,
  update,
  remove,
};
