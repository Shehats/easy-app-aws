export const Entity = <T extends {new(...args: any[]):{}}> () => function(target: T) {

}

export const EasyController = <T extends {new(...args: any[]):{}}> () => function(target: T) {
  
}