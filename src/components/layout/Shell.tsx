'use client';
import {useState} from 'react';import Header from './Header';import AccessibilityPanel from '@/components/accessibility/AccessibilityPanel';import VLibras from '@/components/accessibility/VLibras';
export default function Shell({children}:{children:React.ReactNode}){const [open,setOpen]=useState(false);return <><Header onAccessibility={()=>setOpen(true)}/>{children}<AccessibilityPanel open={open} onClose={()=>setOpen(false)}/><VLibras/></>}
