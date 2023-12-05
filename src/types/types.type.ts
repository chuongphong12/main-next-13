export class ListConfig {
  label = 'label'
  value = 'value'
}

export type ContainerController = {
  control?: any
  register?: any
}

export type BoxState = 'normal' | 'hover' | 'focused' | 'disabled'

export type PaginationPayload = {
  page_size: number
  page: number
}

export class ListRes<T> {
  count: number = 0
  next: string | null = ''
  previous: string | null = ''
  results: T

  constructor(results: T) {
    this.results = results
  }
}

export type LoginRes = {
  access_token: string
  refresh_token: string
}

export type CommonRes = {
  message: string
}

export type CaseType = Pick<CaseDetailType, 'id' | 'case_number' | 'gender' | 'files' | 'surgery_date' | 'type'> & {
  patient_name: string
  surgeon_name: string
  status: string
  created_at: string
  order_number: string
}

export type CaseDetailType = {
  id: number
  case_number: string
  first_name: string
  middle_name: string
  last_name: string
  gender: string
  dicom_folder: string
  type: string
  surgery_date: string
  delivery_expected: string
  hospital_name: string
  memo: string
  files: FileRes[]
}

export type FileRes = {
  id: number
  file_type: string
  file: string
  file_name: string
}
