export const UpdateForm = ({callback, data}) => {
  return (
    <form onSubmit={(e) => callback(e)}>
        <label htmlFor="">Title</label>
        <input type="text" name="header" defaultValue={data.header} />
        <label htmlFor="">Content</label>
        <input type="text" name="content" defaultValue={data.content} />
        <input type="submit" value='Submit' />
    </form>
  )
}