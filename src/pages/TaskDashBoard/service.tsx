import request from 'umi-request';

export async function getTasks(token: string){
  return request(`/backend/daily/tasks?token=${token}`);
}

export async function addTask(params: any){
  return request('/backend/daily/addTask',{
    method: 'POST',
    data: params,
  });
}

export async function deleteTask(params: any){
  return request('/backend/daily/deleteTask', {
    method: 'POST',
    data: params,
  });
}
