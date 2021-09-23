export default function ({ redirect }) {
  if ( sessionStorage.getItem("myAuth") != 'true') {
    return redirect('/user/login')
  }
}