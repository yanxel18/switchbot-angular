export interface machineQR {
  machineQR: string
}
export interface WorkerToken {
  WorkerToken: {
    ScanInfo: MachineUserInfo | null,
    Noket: string | null
  }
}
export interface WorkerInfo {
  ID: number,
  FullName: string,
  AccLvl: number,
  UserQR?: string,
  GIDFull: string
}
export interface LoginInfo {
  GIDFull: string,
  Pass: string
}
export interface WorkerSelect{ 
  FullName?: string,
  UserQR?: string, 
}
export interface ResponseWorkerSelect{
  WorkerSelect: WorkerSelect[] | []
}
export interface AccessInfo {
  accessInfo: {
    UserInfo?: WorkerInfo,
    Noket?: string | null
  }
}

export interface WorkerInfoRegister extends WorkerInfo {
  pass: string
}
export interface MessageInfo {
  messages: [EMessages]
}
export interface EMessages {
  eventMSGID: number
  eventMSG: string
}
export interface AccountType {
  acclvlID?: number,
  accType?: string
}

export interface EventMessages {
  EventMsg: MessageInfo
}
export interface MachineList extends MachineType, SwitchBot, Raspi { }

export interface MachineUserInfo extends MachineList {
  UInfo: WorkerInfo[]
}
export interface MachineType {
  machineID: number,
  machineName: string,
  machineModel: string
}
export interface MachineListView {
  machineID?: number,
  machineName?: string,
  machineModel?: string,
  machineSwitchbotID?: number
  machineQR?: string
}

export interface MachineSelect { 
  machineName?: string, 
  machineQR?: string
}
export interface SwitchBot {
  switchbotID?: number,
  switchbotName?: string,
  switchbotMac?: string,
  switchbotRaspiID?: number
}

export interface Raspi {
  raspiID: number,
  raspiName: string,
  raspiServer: string
}
export interface Terminal {
  terminalID: number,
  terminalName: string
}
export interface EventParam {
  msgID: number
}
export interface createTabletEvent {
  terminalID: number,
  eventMSG: number[]
}

export interface eventMsgs {
  eventMSGID: number
}
export interface CreateEventLogs {
  createEventLogs: string
}
export interface CreateEventLogsHold {
  createEventLogsHold: string
}

 


export interface LastEvent extends TerminalEvents {
  LogDate?: string,
  EventType?: string,
  MachineID?: number, 
}

export interface LastEventResponse {
  LastEvent: LastEvent[] | []
}
export interface TerminalEvents {
  termID?: number,
  termMsgID?: number,
  termEventMsg?: string,
  termAction?: number
}
export interface TerminalListEventParam {
  terminalID: number,
  termAction?: number,
  lang: string | null
}

export interface SwitchbotState {
  WorkerInfo: WorkerInfo[] | [],
  UserSignIn: boolean,
  ScanComplete: boolean
}

export interface CreateSwitchBotForm {
  macAddressTxt: string,
  switchbotTxt: string
}
export interface ResponseCreateSwitchBot {
  createSwitchBot: string
}

export interface ReponseDeleteSwitchbot {
  deleteSwitchBot: string
}
export interface ReponseUpdateSwitchbot {
  updateSwitchBot: string
}
export interface ResponseSwitchbotList {
  SwitchBot: SwitchBot[] | []
}
export interface ResponseTerminalEvent{
  TerminalEvents: TerminalEvents[] | []
}
export interface ResponseTerminalListEvent{
  TerminalListEvents: TerminalEvents[] | []
}
export interface ResponseEventMsgList {
  EventMsgList: EMessages[]
}
export interface ResponseTerminalList {
  TerminalList: Terminal[] | [];
}

export interface ResponseTerminalListView {
  TerminalListView: Terminal[] | [];
}
export interface ReponseUpdateRaspi {
  updateRaspi: string
}
export interface ReponseRaspiList {
  RaspiList: Raspi[]
}
export interface ResponseCreateRaspi {
  createRaspi: string
}
export interface ReponseDeleteRaspi {
  deleteRaspi: string
}
export interface ResponseCreateTabletEvent {
  createTabletEvent: string
}
export interface ResponseMachineViewList {
  MachineViewList: MachineListView[] | []
}
export interface ResponseMachineSelect {
  MachineSelect: MachineSelect[] | []
}
export interface ResponseMachineList {
  MachineList: MachineListView[] | []
}

export interface ResponseUpdateMachine {
  updateMachine: string
}

export interface ResponseCreateMachine {
  createMachine: string
}

export interface ResponseDeleteMachine {
  deleteMachine: string
}

export interface QRFields {
  description: string | undefined,
  qrcode: string | undefined
}

export interface ResponseWorkerList {
  WorkerList: WorkerInfo[] | []
}

export interface ResponseWorkerViewList {
  WorkerViewList: WorkerInfo[] | []
}
export interface ResponseAccountTypeList {
  AccountType: AccountType[] | []
}

export interface CreateAccountResponse {
  createAccount: string
}

export interface UpdateAccountResponse {
  updateAccount: string
}

export interface UpdatePassResponse {
  updatePass: string
}

export interface AccountInfoResponse {
  AccountInfo: WorkerInfo[]
}
