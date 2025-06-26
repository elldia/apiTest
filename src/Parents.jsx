import Child from "./Child";


function Parents(){
    const name = ['봄','여름', '가을', '겨울']
    return (
        <>
            <h1>부모</h1>
            <Child childName={name[0]} />
            <Child childName={name[1]} />
            <Child childName={name[2]} />
            <Child childName={name[3]} />
        </>
    )
}
export default Parents;