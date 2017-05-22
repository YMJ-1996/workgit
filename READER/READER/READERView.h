
// READERView.h : CREADERView ��Ľӿ�
//

#pragma once

#include "resource.h"


class CREADERView : public CFormView
{
protected: // �������л�����
	CREADERView();
	DECLARE_DYNCREATE(CREADERView)

public:
	enum{ IDD = IDD_READER_FORM };

// ����
public:
	CREADERDoc* GetDocument() const;

// ����
public:

// ��д
public:
	virtual BOOL PreCreateWindow(CREATESTRUCT& cs);
protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV ֧��
	virtual void OnInitialUpdate(); // ������һ�ε���

// ʵ��
public:
	virtual ~CREADERView();
#ifdef _DEBUG
	virtual void AssertValid() const;
	virtual void Dump(CDumpContext& dc) const;
#endif

protected:

// ���ɵ���Ϣӳ�亯��
protected:
	afx_msg void OnFilePrintPreview();
	afx_msg void OnRButtonUp(UINT nFlags, CPoint point);
	afx_msg void OnContextMenu(CWnd* pWnd, CPoint point);
	DECLARE_MESSAGE_MAP()
};

#ifndef _DEBUG  // READERView.cpp �еĵ��԰汾
inline CREADERDoc* CREADERView::GetDocument() const
   { return reinterpret_cast<CREADERDoc*>(m_pDocument); }
#endif

