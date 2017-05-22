
// READERView.h : CREADERView 类的接口
//

#pragma once

#include "resource.h"


class CREADERView : public CFormView
{
protected: // 仅从序列化创建
	CREADERView();
	DECLARE_DYNCREATE(CREADERView)

public:
	enum{ IDD = IDD_READER_FORM };

// 特性
public:
	CREADERDoc* GetDocument() const;

// 操作
public:

// 重写
public:
	virtual BOOL PreCreateWindow(CREATESTRUCT& cs);
protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV 支持
	virtual void OnInitialUpdate(); // 构造后第一次调用

// 实现
public:
	virtual ~CREADERView();
#ifdef _DEBUG
	virtual void AssertValid() const;
	virtual void Dump(CDumpContext& dc) const;
#endif

protected:

// 生成的消息映射函数
protected:
	afx_msg void OnFilePrintPreview();
	afx_msg void OnRButtonUp(UINT nFlags, CPoint point);
	afx_msg void OnContextMenu(CWnd* pWnd, CPoint point);
	DECLARE_MESSAGE_MAP()
};

#ifndef _DEBUG  // READERView.cpp 中的调试版本
inline CREADERDoc* CREADERView::GetDocument() const
   { return reinterpret_cast<CREADERDoc*>(m_pDocument); }
#endif

