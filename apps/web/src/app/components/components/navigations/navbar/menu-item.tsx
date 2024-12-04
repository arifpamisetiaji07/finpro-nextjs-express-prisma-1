import Link from 'next/link'

type TMenuItem = {
  href:string
  label: string
  onClick:()=>void
}
const MenuItem = (props: TMenuItem) => {
  return (
    <Link onClick={props.onClick} href={props.href}>{ props.label}</Link>
  )
}

export default MenuItem