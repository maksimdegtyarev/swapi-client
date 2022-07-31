import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from '../mainPage/MainPage';
import { DetailPage } from '../detailPage/DetailPage';

export const Bootstrap = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};