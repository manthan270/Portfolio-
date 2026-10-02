import React from 'react';
import { motion } from 'motion/react';
import SectionWrapper from './SectionWrapper';
import OptimizedVideo from './OptimizedVideo';

const FigmaExploration = ({ data }) => {
  return (
    <SectionWrapper title="Figma">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-auto">
        {data.map((item, index) => (
          <motion.div
            key={item.src || index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="col-span-1 rounded-lg overflow-hidden relative group"
          >
            <OptimizedVideo
              src={item.src}
              className="w-full h-full object-contain"
            />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default FigmaExploration;
