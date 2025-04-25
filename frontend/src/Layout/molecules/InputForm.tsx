import * as React from 'react';
import { Box, styled } from '@mui/system';
import {  MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Icon } from '../atoms/icon';
import { SMContext } from '../../context/context';
import { Account } from '../../data/AccountStore';
import { Course } from '../../data/CourseStore';
import { Dayjs } from 'dayjs';
import { Teacher } from '../../data/TeacherStore';

type TextFieldItemProps = {
  title?: string;
  placeholder?: string;
  children?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = styled('div')({
  display: 'flex',
  gap: '0',
  padding: ' 0 10px',
  flexDirection: 'column',
})

const InputTitle = styled('p')({
  fontSize: '14px',
  marginBottom: '5px',
})

export default function TextFieldItem({title, placeholder, children, onChange}: TextFieldItemProps) {
  return (
    <>
      <InputBox>
        <InputTitle
        >{title}</InputTitle>
        <TextField 
          placeholder={placeholder}
          onChange={onChange}
          variant="outlined"
          size="small"
          sx={{
            width: '100%',
            height: '100%',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#C4C4C4',
              },
              '&:hover fieldset': {
                borderColor: '#C4C4C4',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#C4C4C4',
              },
            },
          }}
        ></TextField>
      </InputBox>
    </>
  );
}

type SelectItemProps = {
  title: string;
  onChange?: (event: SelectChangeEvent<string | number | Date>) => void;
  type: 'course' | 'teacher'
};

export const SelectItem = ({title, onChange, type}: SelectItemProps) => {
  const [listMenuItem, setListMenuItem] = React.useState<Course[] | Teacher[]>();
  const context = React.useContext(SMContext);
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          if (type === "course") {
            await context?.CourseStore.getAll(); // Lấy danh sách khóa học
            setListMenuItem(context?.CourseStore.courses || []);
          } else if (type === "teacher") {
            await context?.TeacherStore.getAll(); // Lấy danh sách giáo viên
            setListMenuItem(context?.TeacherStore.teachers || []);
          }
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      };
  
      fetchData(); 
  }, [context]);
  return (
    <>
      <InputBox>
        <InputTitle>{title}</InputTitle>
        <Select 
          sx={{ width: '100%' }} 
          defaultValue={1} size="small"
          onChange={onChange}
        >
            {listMenuItem?.map((item) => (
            <MenuItem
              key={type === "course" ? (item as Course).CourseID : (item as Teacher).TeacherID}
              value={type === "course" ? (item as Course).CourseID : (item as Teacher).TeacherID}
            >
              {type === "course" ? (item as Course).CourseName : (item as Teacher).FullName}
            </MenuItem>
          ))}
        </Select>
      </InputBox>
    </>
  );
}

type ClassDatePickerProps = {
  title: string;
  onChange?: (date: Date | null) => void; // Hàm callback để truyền giá trị ngày
};

export const ClassDatePicker = ({title, onChange}: ClassDatePickerProps) => {
  return(
    <>
      <InputBox>
        <InputTitle>{title}</InputTitle>
        <DatePicker 
          slotProps={{ textField: { size: 'small'} }}
          sx={{width: '100%'}}
          onChange={(value: Dayjs | null) => onChange?.(value ? value.toDate() : null)}
        />
      </InputBox>
    </>
  )
}

type SearchBoxProps = {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBox = () => {
  return (
    <>
      <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
       
      }}
      variant="outlined"
      placeholder="Search..."
      size="small"
      />
      <Icon name='search' sx={{cursor: 'pointer'}}></Icon>
      </>
  )
}
