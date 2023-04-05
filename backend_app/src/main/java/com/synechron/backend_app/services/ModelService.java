package com.synechron.backend_app.services;

import com.synechron.backend_app.dtos.ModelDto;
import com.synechron.backend_app.mapper.ModelMapper;
import com.synechron.backend_app.models.Model;
import com.synechron.backend_app.repositories.ModelRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ModelService {
    private ModelRepository modelRepository;
    private ModelMapper modelMapper;

    public ModelService(ModelRepository modelRepository, ModelMapper modelMapper) {
        this.modelRepository = modelRepository;
        this.modelMapper = modelMapper;
    }

    public List<ModelDto> findAllModels(String brandId, String modelId) {
        long convertedBrand;
        long convertedModel;

        List<Model> models = new ArrayList<>();

        if (brandId.equals("") && modelId.equals("")) {
            models = modelRepository.findAll();
        } else if (!brandId.equals("") && modelId.equals("")){
            convertedBrand = Long.parseLong(brandId);
            models = modelRepository.findModelsByBrand(convertedBrand);
        } else if (brandId.equals("") && !modelId.equals("")) {
            convertedModel = Long.parseLong(modelId);
            models.add(modelRepository.findById(convertedModel).orElseThrow(() -> new RuntimeException()));
        }

        List<ModelDto> modelDtos = new ArrayList<>();

        for (Model m: models) {
            modelDtos.add(modelMapper.fromEntityToDto(m));
        }

        return modelDtos;
    }
}
