import request from '@/utils/request';

export async function getWeightData(token: string) {
  return request(`/backend/weight/weightAndTime?token=${token}`);
}

export async function updateWeightData(params: any) {
  return request('/backend/weight/changeWeightData', {
    method: 'POST',
    data: params,
  });
}

export async function deleteWeightData(params: any){
  return request('/backend/weight/deleteWeightData', {
    method: 'POST',
    data: params,
  });
}
