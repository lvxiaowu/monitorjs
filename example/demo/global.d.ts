declare module '*.less' {
  const content: any
  export default content
}
declare module '*.css' {
  const content: any
  export default content
}
declare const __MODE__: 'start' | 'build'
declare const __ENV__: 'dev' | 'qa' | 'qa01' | 'sat' | 'pre' | 'pro'
