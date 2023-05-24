export interface ILabel {
    color: string;
    text: string;
  }
  
  export interface ITask {
    id: number;
    completed: boolean;
    text: string;
  }
  
  export interface ICard {
    id: string;
    name: string;
    labels: ILabel[];
    endDate: Date;
    tasks: ITask[];
    description: string;
    status: string;
    employeeId:string
    employee: [];
  }
  
  export interface IBoard {
    id: number;
    title: string;
    cards: ICard[];
    
  }
  