
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import template1 from '../../public/template/template1.png'
import template2 from '../../public/template/template2.png'
import template3 from '../../public/template/template3.png'
import template4 from '../../public/template/template4.png'
import template5 from '../../public/template/template5.png'
import template6 from '../../public/template/template6.png'
import template7 from '../../public/template/template7.png'
import template8 from '../../public/template/template8.png'
import template9 from '../../public/template/template9.png'
import template10 from '../../public/template/template10.png'
import template11 from '../../public/template/template11.png'
import template12 from '../../public/template/template12.png'
import template13 from '../../public/template/template13.png'
import template14 from '../../public/template/template14.png'
import template15 from '../../public/template/template15.png'
import template16 from '../../public/template/template16.png'
import template17 from '../../public/template/template17.png'
import template18 from '../../public/template/template18.png'
import template19 from '../../public/template/template19.png'
import template20 from '../../public/template/template20.png'
const TemplateSelector = ({ selectedTemplate, setSelectedTemplate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [templateId, setTemplateId] = useState(selectedTemplate);
  const templates = [
    { key: 'template1', imageUrl: template1 },
    // { key: 'template2', imageUrl: template2 },
    { key: 'template3', imageUrl: template3 },
    { key: 'template4', imageUrl: template4 },
    { key: 'template5', imageUrl: template5 },
    { key: 'template6', imageUrl: template6 },
    { key: 'template7', imageUrl: template7 },
    { key: 'template8', imageUrl: template8 },
    { key: 'template9', imageUrl: template9 },
    { key: 'template10', imageUrl: template10 },
    { key: 'template11', imageUrl: template11 },
    { key: 'template12', imageUrl: template12 },
   
    { key: 'template13', imageUrl: template13 },
    { key: 'template14', imageUrl: template14 },
    { key: 'template15', imageUrl: template15 },
    { key: 'template16', imageUrl: template16 },
    { key: 'template17', imageUrl: template17 },
    { key: 'template18', imageUrl: template18 },
    { key: 'template19', imageUrl: template19 },
    { key: 'template20', imageUrl: template20 },
    // { key: 'template21', imageUrl: template20 },
    // { key: 'template22', imageUrl: template20 },
    // { key: 'template23', imageUrl: template20 },
    // { key: 'template24', imageUrl: template20 },
    // { key: 'template25', imageUrl: template20 },
    // { key: 'template26', imageUrl: template20 },
    // { key: 'template27', imageUrl: template20 },
    // { key: 'template28', imageUrl: template20 },
  ];


  useEffect(() => {
    const selectedIndex = templates.findIndex(template => template.key == selectedTemplate);
    if (selectedIndex !== -1) {
      setCurrentIndex(selectedIndex);
    }
  }, [selectedTemplate]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleTemplateClick = (templateKey) => {
    setSelectedTemplate(templateKey);
    setTemplateId(templateKey);
    closeModal();
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? templates.length - 3 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === templates.length - 3 ? 0 : prevIndex + 1
    );
  };

  const getDisplayedTemplates = () => {
    const start = Math.max(0, currentIndex - 1);
    const end = Math.min(templates.length, currentIndex + 2);
    return templates.slice(start, end);
  };

  return (
    <div className="font-sans">
      <button
        onClick={openModal}
        className="hidden md:block rounded-lg border-2 m-2 border-blue-800 px-5 py-2 font-bold bg-white text-blue-800"
      >
        <span>Selected: {templateId || 'template1'}</span>
      </button>
      <button
        onClick={openModal}
        className="block md:hidden rounded-lg border-2 m-2 border-blue-800 px-5 py-2 font-bold bg-white text-blue-800"
      >
       Template
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/75 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-5xl relative shadow-2xl">
            <div className="text-lg font-bold mb-4 text-center border rounded-3xl py-2 text-white bg-gray-800">
              Select a Template
            </div>

            <div className="relative flex items-center mb-6">
              <button
                onClick={goToPrevious}
                className="absolute -left-3 z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>

              <div className="flex justify-center w-full overflow-hidden px-8">
                <div className="flex gap-4">
                  {getDisplayedTemplates().map((template) => (
                    <div
                      key={template.key}
                      onClick={() => handleTemplateClick(template.key)}
                      className={`
                        relative group cursor-pointer transition-all duration-300
                        ${template.key === templateId 
                          ? 'transform scale-105'
                          : 'hover:scale-102'
                        }
                      `}
                    >
                      <div className={`
                        w-64 p-2 rounded-lg transition-all duration-300
                        ${template.key === templateId 
                          ? 'bg-blue-100 ring-4 ring-blue-500 ring-offset-2'
                          : 'hover:bg-gray-50'
                        }
                      `}>
                        <div className="relative">
                          <Image
                            src={template.imageUrl}
                            alt={template.key}
                            width={300}
                            height={400}
                            className={`
                              w-full h-80 object-cover rounded-lg shadow-md transition-transform duration-300
                              ${template.key === templateId 
                                ? 'ring-2 ring-blue-400'
                                : 'group-hover:ring-2 group-hover:ring-blue-300'
                              }
                            `}
                          />
                          {template.key === templateId && (
                            <div className="absolute inset-0 border-4 border-blue-500 rounded-lg pointer-events-none" />
                          )}
                        </div>
                        <div className={`
                          mt-2 text-center py-2 px-4 rounded-md transition-colors duration-300
                          ${template.key === templateId 
                            ? 'bg-blue-500 text-white font-semibold'
                            : 'text-gray-600 group-hover:text-blue-600'
                          }
                        `}>
                          {template.key}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={goToNext}
                className="absolute -right-3 z-10 flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <button
              onClick={closeModal}
              className="w-full sm:w-auto px-6 py-2.5 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center mx-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;